"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var apollo_server_express_1 = require("apollo-server-express");
var types_1 = __importDefault(require("./graphql/types"));
var resolvers_1 = __importDefault(require("./graphql/resolvers"));
var mongoose_1 = __importDefault(require("mongoose"));
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: types_1.default,
    resolvers: resolvers_1.default,
    context: function (req) {
        return req;
    },
    formatError: function (error) {
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
    app: app_1.default
});
mongoose_1.default
    .connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true
})
    .then(function (result) {
    console.log('MongoDB is connecting');
    app_1.default.listen(process.env.DEV_PORT || 3004, function () {
        console.log('Express is running');
    });
})
    .catch(function (err) { return console.log(err); });
