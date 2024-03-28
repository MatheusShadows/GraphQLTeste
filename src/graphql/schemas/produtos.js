import { gql } from 'apollo-server-express'

const produtosSchema = gql(`
   type Produto {
      produto_id: Int!
      produto_nome: String!
      produto_valor: Float!
      produto_id_externo: String!
   }

   type Mutation {
      createProduct(input: RegistroProdutoInput!): Produto
      alterProduct(input: AlterProdutoInput!): AlterProdutoResponse
      removeProduct(input: RemoveProdutoInput!): RemoveProdutoResponse
   }

   type Query {
      getProduct(input: QueryProdutos!): Produto,
      getAllProducts: [Produto]
   }

   input QueryProdutos {
      produto_id: Int!
   }

   input RegistroProdutoInput {
      produto_nome: String!
      produto_valor: Float!
      produto_id_externo: String!
   }

   input AlterProdutoInput {
      produto_id: Int!
      produto_nome: String!
      produto_valor: Float!
      produto_id_externo: String!
   }

   type AlterProdutoResponse {
      produto_id: Int!
      produto_nome: String!
      produto_valor: Float!
      produto_id_externo: String!
   }

   input RemoveProdutoInput {
      produto_id: Int!
   }

   type RemoveProdutoResponse {
      produto_nome: String!
      produto_valor: Float!
      produto_id_externo: String!
   }
   `
)

export default produtosSchema