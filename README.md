# 📝 Kanban Task Manager

Uma aplicação web de gerenciamento de tarefas inspirada na metodologia Kanban, similar ao Trello. Este projeto permite criar, editar e organizar tarefas em diferentes etapas para um fluxo de trabalho eficiente.

## 📋 Funcionalidades

- Autenticação: Sistema de login seguro para proteger o acesso.
- Quadro: Visualize suas tarefas organizadas em colunas (Por Fazer, Em Progresso, Concluído, etc.).
- Crie quantas colunas quiser.
- Nomeie as colunas como quiser, adequando para as especificidades de cada projeto.
- Crie quadros para diferentes projetos.
- Favorite projetos específicos, que serão exibidos em uma seção exclusiva no projeto.
- Drag'n Drop: Mova tarefas entre colunas facilmente para atualizar seu status.
- Crie cards personalizados de tarefas, podendo customizar seu conteúdo e descrição.

## 🚀 Tecnologias Utilizadas

### 📱 Front-end
- React. para base do projeto e manipulação de DOM.
- Material-UI (MUI): Componentes prontos para estilização
- Redux: Gerenciamento de estados.
- React Router Dom: Navegação entre páginas.
- React Beautiful DnD: Implementação de drag-and-drop nas colunas.
- Axios: Requisições HTTP para comunicação com o back-end.
- Moment.js: Manipulação de datas.
- CKEditor 5: Editor de texto enriquecido para customizar os cards com diversidade de recursos.
- Emotion (React e Styled): Estilização com CSS-in-JS.
- Emoji-Mart: Seleção de emojis para enriquecer customização e experiência no uso do sistema.

### 🎰 Back-end
- Express: Framework de servidor rápido e leve.
- Mongoose: Modelagem de dados MongoDB.
- JWT (JSON Web Tokens): Autenticação baseada em tokens.
- Express-Validator: Validação de entradas do usuário.
- Morgan e cookie-parser: Middleware para log e gerenciamento de cookies.
- Crypto-JS: Criptografia para dados sensíveis.
- Nodemon: Hot reload durante o desenvolvimento.
- CORS: Habilitação de acessos entre origens.

- #### 📂 Arquitetura do Backend (MVC)
  - Models: Definições das estruturas de dados (schemas do MongoDB).
  - Controllers: Funções responsáveis pela lógica de negócio.
  - Routes: Definição dos endpoints e rotas da API.
  - Handlers: Manipulação de erros e middleware para validação e segurança

## 📂 Estrutura do Projeto
- client/: Código do cliente React.
- server/: Código do servidor Node.js.

## 🛠️ Pré-requisitos
Node.js, npm e Yarn instalados.
MongoDB em execução localmente ou hospedado.

## 💻 Como Executar Localmente

- Clone o repositório:

  `git clone https://github.com/BrunoL28/kanban-task-manager.git`

  `cd kanban-task-manager`

- Entre na pasta do backend e instale as dependências:

  `cd server`

  `yarn install`

- Saia da pasta do backend e entre na pasta do frontend, e instale as dependências:

  `cd client`

  `yarn install`

- Crie seu banco de dados no Mongo e insira a string de conexão no .env, insira também as Secret Keys.
- Inicie o servidor:

  `cd server`

  `npm run start`

  > O servidor pode ser acessado em localhost:5000

- Inicie o frontend:

   `cd client`

   `npm run start`

  > O frontend pode ser acessado em localhost:3000
