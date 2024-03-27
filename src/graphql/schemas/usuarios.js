import { gql } from 'apollo-server-express'

const usuarios_gql = gql(`
   type Usuario {
      usuario_id: Int!
      usuario_name: String!
      usuario_email: String!
      usuario_password: String!
      usuario_data_nascimento: String!
   }

   extend type Mutation {
      register(input: RegisterInput!): RegisterResponse
      login(input: LoginInput!): LoginResponse
   }

   type RegisterResponse {
      id: Int!
      name: String!
      email: String!
   }

   input RegisterInput {
      name: String!
      email: String!
      password: String!
   }

   input LoginInput {
      email: String!
      password: String!
   }

   type LoginResponse {
      id: Int!
      name: String!
      email: String!
      token: String!
   }
`)