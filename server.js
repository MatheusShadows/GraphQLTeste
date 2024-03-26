import express from 'express';
import { graphqlHTTP } from ('express-graphql');
import schema from ('./schema');

const app = express();

// Middleware de autenticação
app.use('/graphql', (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== 'meu_token_secreto') {
    return res.status(401).send('Acesso negado. Token inválido.');
  }
  next(); // Continua para o GraphQL se o token estiver correto
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Habilita a interface GraphiQL
}));

app.listen(4000, () => console.log('Server running on http://localhost:4000/graphql'));
