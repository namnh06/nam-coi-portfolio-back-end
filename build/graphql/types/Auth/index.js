"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type AuthData {\n    token: String!\n    userId: ID!\n  }\n  type Query {\n    login(email: String!, password: String!): AuthData!\n    requestResetPassword(email: String!): String!\n  }\n  type Mutation {\n    signOut(token: String!): String!\n  }\n"], ["\n  type AuthData {\n    token: String!\n    userId: ID!\n  }\n  type Query {\n    login(email: String!, password: String!): AuthData!\n    requestResetPassword(email: String!): String!\n  }\n  type Mutation {\n    signOut(token: String!): String!\n  }\n"])));
var templateObject_1;
