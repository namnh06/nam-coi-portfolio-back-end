import {
  gql
} from 'apollo-server-express';

export default gql `
type User {
  _id: ID!
  name: String!
  email: String!
  password: String!
  # posts: [Post!]!
  # comments: [Comment!]!
}

type Query {
  user(_id: ID!): User!
  users: [User!]!
  testUser: String!
  truncateUsersTable: String!
}

type Mutation {
  createUser(CreateUserInput: CreateUserInput): User!
  updateUser(_id: String!, user: UpdateUserInput!): User!
  deleteUser(_id: String!): User!
}

input CreateUserInput {
  name: String!
  email: String!
  password: String!
}

input UpdateUserInput {
  name: String
  email: String
} 
`;