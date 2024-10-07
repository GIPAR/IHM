# **Sistema Interativo da Cadeira de Rodas Nara - [Em Desenvolvimento]**
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
### **Clonando o Repositório**
Clone este repositório usando o seguinte comando:
```bash
git clone git@github.com:GIPAR/IHM.git
```

### **Executando o Frontend Com Docker**
Para executar o projeto com Docker, siga os seguintes passos:
1. Navegue até a pasta do projeto:
```bashC
cd IHM/frontend
```
2. Instale as dependências necessárias:
```bash
npm install
```
Caso não seja possível instalar as dependências com o comando acima:
```bash
npm install --legacy-peer-deps
```

3. Execute o seguinte comando para subir os containers do projeto:
```bash
npm run start:docker
```
Isso deve iniciar a execução do projeto frontend dentro de um container Docker.

### **Executando o servidor backend**
Para executar o projeto backend, siga os seguintes passos:
1. Navegue até a pasta do projeto:
```bash
cd IHM/backend
```
2. Execute o seguinte comando para instalar as dependências necessárias:
```bashC
npm install
```
3. Execute o seguinte comando para subir o servidor:
```bashC
npm start
```
Isso deve iniciar a execução do projeto backend.
