require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server');

const { importSchema } = require('graphql-import');

const resolvers = require('./apollo/src/resolvers');
const { prisma } = require('./apollo/src/generated/prisma-client');
const typeDefs = importSchema('./apollo/schema/schema.graphql');

const jwt = require('jsonwebtoken');

const getUser = token => {
	try {
		if (token) {
			return jwt.verify(token, process.env.JWT_SECRET);
		}
		return null;
	} catch (err) {
		return null;
	}
};

const server = new ApolloServer({
	typeDefs: gql(typeDefs),
	resolvers,

	context: ({ req }) => {
		const tokenWithBearer = req.headers.authorization || '';
		const token = tokenWithBearer.split(' ')[1];
		const user = getUser(token);

		return {
			user,
			prisma, // the generated prisma client if you are using it
		};
	},
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
