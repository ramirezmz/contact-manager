# Sistema API

## Descrição

Sistema API é um projeto de estudo para a criação de uma API RESTful com NodeJS, Express e MongoDB.

## Instalação

```bash
npm install
```

## Execução

- Precisa do `.env` definido na raiz do projeto server.
- Precisa ter o Docker instalado para executar o MongoDB.

```bash
docker-compose up -d
npm start
```

## Rotas

### Usuários

#### GET /users

Retorna todos os usuários.

#### GET /user/:id

Retorna um usuário específico.

#### POST /user

Cria um novo usuário.

#### PUT /user/:id

Atualiza um usuário específico.

#### DELETE /user/:id

Deleta um usuário específico.