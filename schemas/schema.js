const Client = require("../models/Client");
const Project = require("../models/Project");
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
});

const ProjectType = new GraphQLObjectType({
  name: "Client",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    clientId: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    clients: {
      type: GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLString },
      },
      resolve(parent, args) {
        const newClient = new Client(args);
        return newClient.save();
      },
    },
    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Client.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name, email: args.email, phone: args.phone } },
          { new: true }
        );
      },
    },
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Client.findByIdAndDelete(args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

module.exports = schema;
