"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var auth = require('./middleware/auth');
var apollo_server_express_1 = require("apollo-server-express");
var types_1 = __importDefault(require("./graphql/types"));
var resolvers_1 = __importDefault(require("./graphql/resolvers"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express();
app.use(cors());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE ');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use(auth);
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: types_1.default,
    resolvers: resolvers_1.default,
    context: function (_a) {
        var req = _a.req;
        return req;
    },
    formatError: function (error) {
        console.log(error);
        var detail = error.message || 'An error occurred.';
        var title = error.extensions.code;
        var status = error.extensions.exception.code || 500;
        return {
            detail: detail,
            title: title,
            status: status
        };
    }
});
server.applyMiddleware({
    app: app
});
mongoose
    .connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true
})
    .then(function (result) {
    console.log('MongoDB is connecting');
    app.listen(3004, function () {
        console.log('Express is running');
    });
})
    .catch(function (err) { return console.log(err); });
