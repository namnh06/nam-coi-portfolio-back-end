"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("./User"));
var Auth_1 = __importDefault(require("./Auth"));
var resolvers = [User_1.default, Auth_1.default];
exports.default = resolvers;
