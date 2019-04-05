const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
import {
  ApolloServer
} from 'apollo-server-express';

import typeDefs from './graphql/types';
import resolvers from './graphql/resolvers';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
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
    console.log('MongoDB is connecting');
    app.listen(3004, () => {
      console.log('Express is running');
    });
  })
  .catch(err => console.log(err));