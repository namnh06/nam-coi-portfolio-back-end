import {
  gql
} from 'apollo-server-express';

export default gql `
type AuthData{
  token: String!
  userId: ID!
}
type Query {
  login(email: String!, password: String!): AuthData!
}
type Mutation {
  signOut(token: String!): String!
}
`;