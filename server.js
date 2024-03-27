import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema.js';
import dbTeste from './src/databases/dbTeste.js';


const app = express();
// Middleware de autenticação
app.use('/graphql', (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== 'meu_token_secreto') {
    return res.status(401).send('Acesso negado. Token inválido.');
  }
  next(); // Continua para o GraphQL se o token estiver correto
});

dbTeste

app.all('/graphql', createHandler({schema:schema,}));

app.listen(process.env.PORT_SERVER, () => console.log(`Server running on http://localhost:${process.env.PORT_SERVER}/graphql`));
