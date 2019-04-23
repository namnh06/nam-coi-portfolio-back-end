"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    _id: ID!\n    name: String!\n    email: String!\n    password: String!\n    # posts: [Post!]!\n    # comments: [Comment!]!\n  }\n\n  extend type Query {\n    user(_id: ID!): User!\n    users: [User!]!\n    testUser: String!\n    truncateUsersTable: String!\n  }\n\n  extend type Mutation {\n    createUser(CreateUserInput: CreateUserInput): User!\n    updateUser(_id: String!, user: UpdateUserInput!): User!\n    deleteUser(_id: String!): User!\n  }\n\n  input CreateUserInput {\n    name: String!\n    email: String!\n    password: String!\n  }\n\n  input UpdateUserInput {\n    name: String\n    email: String\n  }\n"], ["\n  type User {\n    _id: ID!\n    name: String!\n    email: String!\n    password: String!\n    # posts: [Post!]!\n    # comments: [Comment!]!\n  }\n\n  extend type Query {\n    user(_id: ID!): User!\n    users: [User!]!\n    testUser: String!\n    truncateUsersTable: String!\n  }\n\n  extend type Mutation {\n    createUser(CreateUserInput: CreateUserInput): User!\n    updateUser(_id: String!, user: UpdateUserInput!): User!\n    deleteUser(_id: String!): User!\n  }\n\n  input CreateUserInput {\n    name: String!\n    email: String!\n    password: String!\n  }\n\n  input UpdateUserInput {\n    name: String\n    email: String\n  }\n"])));
var templateObject_1;
