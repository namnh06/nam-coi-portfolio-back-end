const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE ');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(auth);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({
    req
  }) => {
    return req;
  },
  formatError: error => {
    console.log(error);
    const detail = error.message || 'An error occurred.';
    const title = error.extensions.code;
    const status = error.extensions.exception.code || 500;
    return {
      detail,
      title,
      status
    }
  }
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