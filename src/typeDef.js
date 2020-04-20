const { gql } = require('apollo-server');

const typeDefs = gql`
	# scalar Date

	type User {
		id: ID!
		username: String!
		name: String
		email: String
		vacations: [Vacation!]
	}

	type Vacation {
		id: ID!
		title: String!
		startDate: String!
		endDate: String!
		events: [Event!]
		traveler: User
	}

	type Event {
		id: ID!
		title: String!
		date: String!
		startTime: String
		endTime: String
		description: String
    	trip: Vacation
	}

	type Query {
		users: [User!]!
		currentUser: User!
		userVacations: [Vacation!]!
		currentVacation: Vacation!
		dayEvents: [Event!]!
		eventInfo: Event!
	}

	type Mutation {
		signUp(
			username: String!
			name: String
			email: String
			password: String!
		): User!

		login(username: String!, password: String!): LoginResponse!

		newVacation(
			title: String!
			startDate: String!
			endDate: String!
			userId: ID!
		): Vacation!

		newEvent(
			date: String!
			startTime: String
			endTime: String
			title: String!
			description: String
			vacationId: ID! 
		): Event!

	}

	type LoginResponse {
		token: String
		user: User
	}
`;

module.exports = typeDefs;
