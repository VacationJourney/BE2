const {ApolloServer} = require('apollo-server');
const resolvers = require('./resolvers/index');
const typeDefs = require('./typeDefs/index');
const {prisma} = require('./generated');

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: req => ({
    prisma,
    req
  })
 });

module.exports = server