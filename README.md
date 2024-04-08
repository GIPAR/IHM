# **Site da Cadeira - [Em Desenvolvimento]**
Este é o repositório do projeto "Site da Cadeira" que ainda está em fase de desenvolvimento. Este arquivo README fornece informações básicas sobre como configurar, instalar e executar o projeto.
## **Regras do Projeto**
A fim de garantir um bom fluxo de trabalho e manter a qualidade do código, é importante seguir as seguintes regras de colaboração:
1. Faça commits seguindo o padrão do **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)**;
2. Não faça commit diretamente na branch *master*;
3. Crie sempre uma nova branch a partir da *master*;
*Exemplo*:
    
```bash
git checkout master && git checkout -b feat-nome-da-sua-branch 
```
    
4. Abra Pull Request a partir da branch que você criou;
*Exemplo*:
    
```bash
git push -u origin feat-nome-da-sua-branch 
```
    
5. Antes de mesclar seu PR (pull request) com a branch *master*, solicite uma revisão de código;
6. Verifique sempre que não houve alteração no comportamento da funcionalidade como um todo ao apagar ou substituir algum trecho de código que já exista.
Essas regras são necessárias para um desenvolvimento eficiente do projeto. Esperamos que todos sigam essas regras sem exceções.

## **Instalação do Projeto**

Antes de instalar o projeto, certifique-se que está utilizando as seguintes versões das tecnologias utilizadas:

- NVM:    0.39.5
- NPM:    10.2.0
- Node:   v21.0.0
- React:  18.2.0
- Docker: 25.0.3

### **Clonando o Repositório**
Clone este repositório usando o seguinte comando:
```bash
git clone git@github.com:GIPAR/site-nara-tech-frontend.git
```
### **Executando o Projeto Sem Docker**
Para executar o projeto sem Docker, siga os seguintes passos:
1. Navegue até a pasta do projeto:
```bash
cd site-nara-tech-frontend
```
2. Instale as dependências necessárias:
```bash
npm install
```
3. Inicie o projeto executando o seguinte comando:
```bash
npm start
```
### **Executando o Projeto Com Docker**
Para executar o projeto com Docker, siga os seguintes passos:
1. Navegue até a pasta do projeto:
```bash
cd site-nara-tech-frontend
```
2. Execute o seguinte comando para subir os containers do projeto:
```bashC
npm run start:docker
```
Isso deve iniciar a execução do projeto dentro de um container Docker.
