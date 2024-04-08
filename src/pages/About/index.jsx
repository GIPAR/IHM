import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoNara from '../../assets/images/logoNara.png';
import { Paragraph, Title } from './style';
import { GridStyled, ImageStyled } from '../Home/style';

const theme = createTheme();

export default function About() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <GridStyled>
          <CssBaseline />
          <ImageStyled src={logoNara} alt="Nara Tecnologia" />
          <Title>Sobre Nós</Title>
          <Paragraph>
            Somos uma equipe, composta por professores e estudantes, que teve o nascimento
            em um Grupo de Inovação e Pesquisa em Automação e Robótica,
            o GIPAR, do Instituto Federal da Bahia, no campus de Vitória da Conquista.
          </Paragraph>
          <Paragraph>
            Nosso produto hoje é melhorar a vida de pessoas com mobilidade reduzida.
            Segundo a Pesquisa Nacional de Saúde, cerca 7,8 milhões das pessoas de 2
            anos ou mais tinham deficiência física nos membros inferiores e 5,5 milhões,
            nos membros superiores. Nesse cenário, sabemos que essa fatia da sociedade
            brasileira que possui mobilidade reduzida ou nula, na grande maioria das
            vezes necessitam de cadeira de rodas para se locomover. Como consequência,
            proporcionar uma vida digna ou até mesmo buscar devolver a autonomia e
            reintegração à sociedade, para essa parte da população é um direito que
            deve ser garantido pelos órgãos públicos, privados e até mesmo pelas famílias.
          </Paragraph>
          <Paragraph>
            A cadeira desenvolvida pela nossa empresa tem como principal objetivo definir a
            trajetória dos usuários de forma autônoma e segura, junto a um sistema interativo
            e intuitivo entre o usuário e a cadeira, utilizando a inteligência artificial para
            tomar as melhores decisões, considerando, critérios de monitoramento facial do usuário,
            percepção do ambiente e um sistema multimodal, que dará  mais liberdade e conforto
            ao usuário.
          </Paragraph>
          <Paragraph>
            Uma aplicação da tecnologia seria facilitar a vida de tetraplégicos, os quais sempre
            necessitam sair de casa acompanhados, pois sozinhos não têm condições de usar uma
            cadeira de rodas convencional ou motorizada. Além disso, paraplégicos e idosos que
            não possuem forças nos membros superiores para dar velocidade a cadeira também seriam
            beneficiados. Portanto, a cadeira de rodas autônoma entregaria liberdade, conforto e
            autonomia a essas pessoas que sempre necessitam de acompanhamento para fazer tarefas
            simples do dia a dia, como ir à escola ou trabalhar.
          </Paragraph>
          <Paragraph>
            As vantagens de nosso produto, com a meta de atingir o primeiro segmento do mercado
            relacionado ao setor educativo. Decidimos implementar nossa proposta, nas instalações
            do IFBA-Campus Vitória da Conquista, por meio de simulação, onde os resultados obtidos
            se mostraram positivos, permitindo validar nosso sistema e trazendo impacto positivo a
            nosso projeto, a possibilidade de atender o mercado nacional com preços menores que os
            preços encontrados em tecnologias fora do país, pois o produto além de ser totalmente
            nacional é uma tecnologia 100%  Brasileira e com grande potencial de se expandir para
            outros nichos do mercado. Por meio de parcerias esperamos expandir nossa tecnologia.
            Vem conhecer nosso projeto!
          </Paragraph>
        </GridStyled>
      </Box>
    </ThemeProvider>
  );
}
