const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const ROSLIB = require("roslib");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ip = require('ip');
const fs = require('fs');
const path = require('path');
const canvas = require('canvas');
const tf = require('@tensorflow/tfjs-node')
const faceapi = require('@vladmandic/face-api/dist/face-api.node');
const model = "./public/models";

const currentURL = ip.address();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "gipar",
  database: "register",
});

app.use(express.json());
app.use(cors());

const robotUrl = `ws://${currentURL}:9090`;

var ros = new ROSLIB.Ros({
  url: robotUrl,
});

var actionClient = new ROSLIB.ActionClient({
  ros : ros,
  actionName : 'move_base_msgs/MoveBaseAction',
  serverName : '/move_base'
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    //console.log(result);
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        //console.log("Senha fornecida:", password);
        //console.log("Senha armazenada:", result[0].password);
        //console.log("Resposta do bcrypt:", response);
        if (error) {
          res.send(error);
        }
        if (response) {
          res.send({ msg: "Usuário logado" });
        } else {
          res.send({ msg: "Senha incorreta" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

app.post("/goal", async (req, res) => {

  //const G1 = [1.912064790725708, 0.7408415079116821];
  //const G2 = [-1.8519995212554932, 0.7108079195022583];
  const Entrance = [0.00, 0.00];

  const G1 = [8.97378158569336, -2.309938669204712];
  const G2 = [10.18726921081543, -2.709124803543091];
  const G3 = [11.433879852294922, 7.783342361450195];
  const G4 = [11.687485694885254, 9.342684745788574];
  const G5 = [11.096196174621582, 9.488042831420898];
  const G6 = [10.797477722167969, 7.745188236236572];
  const G7 = [12.751545906066895, 16.43843650817871];
  const G8 = [13.534222602844238, 16.366744995117188];

  const input = req.body.input.toLowerCase();
  console.log(input)
  
  if (input.includes('go') || input.includes('go to')) {
    const destinations = {
      'entrance': Entrance,
      'g1': G1,
      'g2': G2,
      'g3': G3,
      'g4': G4,
      'g5': G5,
      'g6': G6,
      'g7': G7,
      'g8': G8,
    };

    for (const key in destinations) {
      if (input.includes(key)) {
        const destination = destinations[key];
        var goal = new ROSLIB.Goal({
          actionClient: actionClient,
          goalMessage: {
            target_pose: {
              header: {
                frame_id: 'map'
              },
              pose: {
                position: {
                  x: destination[0],
                  y: destination[1],
                  z: 0.0
                },
                orientation: {
                  x: 0,
                  y: 0,
                  z: 0,
                  w: 1.0
                }
              }
            }
          }
        });
        goal.on('result', function(status) {
          console.log('Resultado recebido: ', 'Chegou ao destino');
        });
  
        goal.send();
        console.log('Objetivo enviado para: ', destination);
        // goal = new ROSLIB.Message({
        //   header: { stamp: { secs: 0, nsecs: 0 }, frame_id: 'map' },
        //   pose: { position: { x: destination[0], y: destination[1], z: 0.0 }, orientation: { x: 0, y: 0, z: 0, w: 1.0 } }
        // });
        // topic.publish(goal);
        res.send(`Okay going to ${key}`);
        return;
      }
    }
    console.log("Destino não reconhecido:", input);
  }
  else {
    const messages = await gemini_stream(input);
    res.send(messages);
    console.log(messages)
  };
});

app.post('/facial', async (req, res) => {
  try {
    // Load models
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(model);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(model);
    await faceapi.nets.ageGenderNet.loadFromDisk(model);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(model);
    await faceapi.nets.faceExpressionNet.loadFromDisk(model);

    // Converter de base64 para imagem jpeg
    const base64 = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
    const temp_path = './public/uploads/temp.jpeg';
    fs.writeFileSync(temp_path, base64, 'base64');
    
    // Carregar e processar imagem da webcam
    const checkImageBuffer = fs.readFileSync(temp_path);
    const checkImageTensor = tf.node.decodeImage(checkImageBuffer, 3);
    const checkFaceDescriptors = await faceapi
      .detectAllFaces(checkImageTensor)
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (checkFaceDescriptors.length === 0) {
      return res.json({ results: ['No face detected'], box: null });
    }

    const images = fs.readdirSync('./public/images');
    let matchLabel = 'Unknown';

    for (const image of images) {
      const filePath = path.join('./public/images', image);

      // Carregar e processar imagem de referência
      const refImageBuffer = fs.readFileSync(filePath);
      const refImageTensor = tf.node.decodeImage(refImageBuffer, 3);
      const refFaceDescriptors = await faceapi
        .detectAllFaces(refImageTensor)
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (refFaceDescriptors.length > 0) {
        const faceMatcher = new faceapi.FaceMatcher(refFaceDescriptors);
        const results = checkFaceDescriptors.map(fd => {
          const bestMatch = faceMatcher.findBestMatch(fd.descriptor);
          return bestMatch.label === 'unknown' ? 'Unknown' : path.parse(image).name;
        });

        if (results.includes(path.parse(image).name)) {
          matchLabel = path.parse(image).name;
          break;
        }
      }
    }

    const box = checkFaceDescriptors[0].detection._box;
    res.json({ results: [matchLabel], box });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const gemini_stream = async (input) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContentStream(input);
    const messages = [];
    for await (const chunk of result.stream) {
      messages.push(chunk.text());
    }
    return messages.join(' ');
  } catch (error) {
    console.log(error);
    return ["Unable to load model, is your API Key valid?"];
  }
};

app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});