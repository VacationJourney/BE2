import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String
    password: String!
  }

  type UserFoundError {
  message: String!
}

union UserRegResult = User | UserFoundError

  type Mutation {
    "User CRUD functionality"
    signUp(username: String, email: String , password: String) : UserRegResult!
    login(username: String, password: String): LoginResponse!
    deleteUser(where: UserWhereUniqueInput!): User
    updateUser(id: ID!, username: String, email: String, password: String): User
    # Vacation CRUD

  }

  type Query {
    users: [User!]
    user: User!
    me: User!
  }

  input UserUpdateInput {
    username: String
    email: String
    password: String
  }

  input UserWhereUniqueInput {
    id: ID
    username: String
  }

  type LoginResponse {
	token: String
	user: User
  }
 

`;

export default typeDefs;