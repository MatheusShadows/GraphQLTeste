import { gql } from 'apollo-server-express'

const usuariosSchema = gql(`
   type Usuario {
      usuario_id: Int!
      usuario_nome: String!
      usuario_email: String!
      usuario_senha: String!
      usuario_data_nascimento: String
   }

   type Mutation {
      createUser(input: RegistroUsuarioInput!): Usuario
      updateUser(input: AtualizarUsuarioInput!): Usuario
      login(input: LoginUsuarioInput!): LoginUsuarioResponse
   }

   type Query {
      getUser(input: QueryUsuario!): Usuario
      getAllUsers: [Usuario]
   }

   input QueryUsuario {
      usuario_id: Int!
   }

   input RegistroUsuarioInput {
      usuario_nome: String!
      usuario_email: String!
      usuario_senha: String!
      usuario_data_nascimento: String
   }

   input AtualizarUsuarioInput {
      usuario_id: Int!
      usuario_nome: String
      usuario_email: String
      usuario_senha: String
      usuario_data_nascimento: String
   }

   input LoginUsuarioInput {
      usuario_email: String!
      usuario_senha: String!
   }

   type LoginUsuarioResponse {
      usuario_id: Int!
      usuario_nome: String!
      usuario_email: String!
      token: String!
   }
   `
)

export default usuariosSchema