const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
  id: ID!
  username: String!
  name: String
  email: String
  vacations: [Vacation!]!
}

type Vacation {
  id: ID!
  title: String!
  startDate: DateTime!
  endDate: DateTime!
  events: [Event!]!
}

type Event {
  id: ID! 
  date: DateTime!
  startTime: DateTime
  endTime: DateTime
  title: String!
  description: String
}

type Query {
  currentUser: User!
  userVacations: [Vacation!]!
  currentVacation: Vacation!
  dayEvents: [Event!]!
  eventInfo: Event!
}

type Mutation {
  signUp(username: String!, name: String, email: String, password: String!): User!
  login(username: String!, password: String!): LoginResponse!
  createVacation(title: String!, startDate: DateTime!, endDate: DateTime!, )
}

type LoginResponse {
  token: String
  user: User
}
`;

module.exports = typeDefs;
