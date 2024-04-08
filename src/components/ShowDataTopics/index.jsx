import React, { useState, useEffect } from 'react';
import { useROS, ROS } from 'react-ros';
import { TableContainer } from '../../pages/Maintenance/style';
import TableTopics from '../TableTopics';
import { Section, Subtitle } from './style';

let listener = null;

export default function ShowDataTopics() {
  return (
    <ROS>
      <EchoTopic />
    </ROS>
  );
}

function EchoTopic() {
  const {
    createListener,
    topics,
    isConnected,
    url,
    changeUrl,
    toggleConnection,
  } = useROS();

  const [topic, setTopic] = useState('/');
  const [message, setMessage] = useState('');
  const [queue] = useState(0);
  const [compression] = useState('none');

  const unsubscribe = () => {
    if (listener) {
      listener.unsubscribe();
    }
  };

  const handlerMessage = (msg) => {
    setMessage(JSON.stringify(msg));
  };

  const handleTopic = (topicInput) => {
    if (topic !== topicInput) {
      setTopic(topicInput);
      unsubscribe();
      return;
    }
    unsubscribe();
    listener = null;

    Object.keys(topics).forEach((key) => {
      if (topics[key].path === topicInput) {
        listener = createListener(
          topics[key].path,
          topics[key].msgType,
          Number(queue),
          compression,
        );
      }
    });

    if (listener) {
      listener.subscribe(handlerMessage);
    }
  };

  useEffect(() => {
    handleTopic(topic);
  });

  /**
 * It's a function that returns an array of arrays, where each array contains a string
 * returns the proxemic variable.
 */
  const getProxemicZone = () => {
    const proxemic = topics.map((data) => [data.path]);
    let topicIterator;
    for (let i = 0; i < proxemic.length; i += 1) {
      topicIterator = String(proxemic[i]);
      if (topicIterator === '/proxemic') {
        console.log('Encontrou');
      } else {
        console.log('Não encontrou');
      }
    }

    return proxemic;
  };

  getProxemicZone();

  const topicsData = topics.map((data) => [data.path]);

  return (
    <>
      <Section>
        <span className="title-connection">Conexão com a cadeira de rodas:</span>
        <input
          name="urlInput"
          defaultValue={url}
          onChange={(event) => changeUrl(
            event.target.value,
          )}
          type="text"
        />
        <button type="button" onClick={toggleConnection}>Conectar</button>
        <p>
          Status:
          <span>
            {isConnected ? 'CONECTADO' : 'DESCONECTADO'}
          </span>
        </p>
        <hr />
        <Subtitle>Selecione o tópico:</Subtitle>
        <select
          onChange={(event) => handleTopic(event.target.value)}
        >
          <option defaultValue="/" hidden>/selecione_aqui</option>
          {topics.map((dataTopic) => (
            <option key={dataTopic.path}>
              {dataTopic.path}
            </option>
          ))}
        </select>
        <Subtitle>Messagem:</Subtitle>
        <textarea id="msg" rows="20" disabled value={message} />
      </Section>
      <Subtitle>Topicos detectados:</Subtitle>
      <TableContainer>
        <TableTopics topicsData={topicsData} />
      </TableContainer>
    </>
  );
}
