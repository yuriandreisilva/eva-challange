# Project Informations

Projeto criado para inserir jornadas de um colaborador. Desafio Eva Copilot. Realizado por Yuri.

# Project Setup Instructions

## Step 1: Configure Environment Variables
Solicite os dados para colocar no `.env`, com base no `.env-example`.

## Step 2: Recommended Node Version
Versão node recomendada: `20.17.0`.

## Step 3: Run Setup Script
Execute o comando:
```bash
npm run setup
```
Isso fará que seja instalado as dependências do backend e também do frontend.

Também baixará a imagem do MongoDB e Redis para gerenciamento das filas do job.

E também fará migration para inserir dados necessários, como por exemplo, colaborador, jornada e ações (e ainda categoria de ação).

## Step 4: Running the Project
Após setup, para rodar o projeto é simples:

1. Acesse a pasta `/backend` e rode:
    ```bash
    npx nodemon server.js
    ```

2. Acesse a pasta `/frontend` e rode:
    ```bash
    npm run start
    ```

3. Acesse a pasta `/backend` e rode:
    ```bash
    npm run queue
    ```



