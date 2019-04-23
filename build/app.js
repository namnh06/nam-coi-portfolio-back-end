"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var auth_js_1 = __importDefault(require("./middleware/auth.js"));
var body_parser_1 = __importDefault(require("body-parser"));
require('dotenv').config();
var app = express_1.default();
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.config(this.app);
    }
    App.prototype.config = function (app) {
        app.use(function (req, res, next) {
            console.log(process.env.SEND_GRID_API_KEY);
            console.log('object');
            next();
        });
        app.use(cors_1.default());
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
        app.use(auth_js_1.default);
    };
    return App;
}());
exports.default = new App().app;
