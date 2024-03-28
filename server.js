import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema.js';
import sequelize from './src/databases/dbTeste.js';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './src/graphql/index.js';
import { resolvers } from './src/graphql/resolvers/index.js';
import { models } from './src/databases/index.js';


const app = express();
// Middleware de autenticação
app.use('/graphql', (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== 'meu_token_secreto') {
    return res.status(401).send('Acesso negado. Token inválido.');
  }
  next(); // Continua para o GraphQL se o token estiver correto
});

sequelize


const apolloServer = new ApolloServer({ typeDefs:typeDefs, resolvers:resolvers, context: { models } });

await apolloServer.start()
apolloServer.applyMiddleware({app:app,path:'/graphqls'})

//app.use('/graphql', createHandler({schema:schema}));

app.listen(process.env.PORT_SERVER, () => console.log(`Server running on http://localhost:${process.env.PORT_SERVER}/graphql`));
