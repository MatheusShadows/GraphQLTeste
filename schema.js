const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } = require('graphql');

// Mock database
const users = [{ id: '1', name: 'John Doe', email: 'john@example.com' }];

// UserType
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return users.find(user => user.id === args.id);
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = { id: String(users.length + 1), name: args.name, email: args.email };
        users.push(user);
        return user;
      },
    },
    updateUser: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
          name: { type: GraphQLString },
          email: { type: GraphQLString },
        },
        resolve(parent, args) {
          const user = users.find(user => user.id === args.id);
          if (!user) {
            throw new Error('User not found');
          }
          // Atualiza apenas os campos fornecidos
          if (args.name !== undefined) {
            user.name = args.name;
          }
          if (args.email !== undefined) {
            user.email = args.email;
          }
          return user;
        },
      },
      deleteUser: {
        type: GraphQLID, // Retorna o ID do usuário deletado
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          const userIndex = users.findIndex(user => user.id === args.id);
          if (userIndex === -1) {
            throw new Error('User not found');
          }
          users.splice(userIndex, 1); // Remove o usuário do array
          return args.id;
        },
      },      
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
