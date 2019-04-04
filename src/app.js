const express = require('express');
const mongoose = require('mongoose');
import {
  ApolloServer
} from 'apollo-server-express';

import typeDefs from './graphql/types';
import resolvers from './graphql/resolvers';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({
  app
});



mongoose.connect(
    'mongodb://localhost:27017/users', {
      useNewUrlParser: true
    }).then(result => {
    app.listen(3003);
  })
  .catch(err => console.log(err));