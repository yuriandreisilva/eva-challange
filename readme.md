# Informações do projeto

Projeto criado para inserir jornadas de um colaborador. Desafio Eva Copilot. Realizado por Yuri.

# Instruções para Setup

## Passo 1: Configure variáveis de ambiente
Solicite os dados para colocar no `.env`, com base no `.env-example`.

## Passo 2: Versão do node recomendada
Versão node recomendada: `20.17.0`.

## Passo 3: Rodar este comando para setup geral
Execute o comando:
```bash
npm run setup
```
Isso fará que seja instalado as dependências do backend e também do frontend.

Também baixará a imagem do MongoDB e Redis para gerenciamento das filas do job.

E também fará migration para inserir dados necessários, como por exemplo, colaborador, jornada e ações (e ainda categoria de ação).

## Passo 4: Rodando o projeto
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

## Passo 5: Rodando o teste de envio de e-mail

1. Acesse a pasta `/backend` e rode:
    ```bash
    npm test
    ```
## Para o caso de querer refazer o processo:

1. Limpe a base, rode o comando: 
    ```bash
    npm run migrate-remove
    ```

