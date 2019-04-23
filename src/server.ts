import app from './app';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/types';
import resolvers from './graphql/resolvers';
import { Request } from 'express';
import mongoose from 'mongoose';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req: Request) => {
    return req;
  },
  formatError: (error: any): any => {
    const detail = error.message || 'An error occurred.';
    const title = error.extensions.code;
    const status = error.extensions.exception.code || 500;
    return {
      detail,
      title,
      status
    };
  }
});

server.applyMiddleware({
  app
});
mongoose
  .connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true
  })
  .then(result => {
    console.log('MongoDB is connecting');
    console.log('object');
    app.listen(process.env.PORT, () => {
      console.log('Express is running');
    });
  })
  .catch(err => console.log(err));
