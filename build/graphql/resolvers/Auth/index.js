"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../../../models/User"));
var ResetPassword_1 = __importDefault(require("../../../models/ResetPassword"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var uuid = require('uuid/v5');
var moment_1 = __importDefault(require("moment"));
var apollo_server_core_1 = require("apollo-server-core");
exports.default = {
    Query: {
        login: function (obj, args) { return __awaiter(_this, void 0, void 0, function () {
            var user, error, isEqual, error, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({
                            email: args.email
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            error = new Error('User Not Found.');
                            error.code = 401;
                            throw error;
                        }
                        return [4 /*yield*/, bcryptjs_1.default.compare(args.password, user.password)];
                    case 2:
                        isEqual = _a.sent();
                        if (!isEqual) {
                            error = new Error('Password is in correct');
                            error.code = 401;
                            throw error;
                        }
                        token = jsonwebtoken_1.default.sign({
                            userId: user._id.toString(),
                            email: user.email
                        }, 'axon.active', {
                            expiresIn: '1h'
                        });
                        return [2 /*return*/, {
                                token: token,
                                userId: user._id.toString()
                            }];
                }
            });
        }); },
        requestResetPassword: function (obj, args) { return __awaiter(_this, void 0, void 0, function () {
            var email, oldResetPassword, token_1, updateResetPassword, token, resetPassword, resetPasswordSaved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = args.email;
                        return [4 /*yield*/, ResetPassword_1.default.findOne({
                                email: email
                            })];
                    case 1:
                        oldResetPassword = _a.sent();
                        if (!!!oldResetPassword) return [3 /*break*/, 3];
                        token_1 = uuid(email, uuid.DNS);
                        return [4 /*yield*/, oldResetPassword.updateOne({
                                token: token_1,
                                created_at: moment_1.default()
                            })];
                    case 2:
                        updateResetPassword = _a.sent();
                        return [2 /*return*/, 'updated'];
                    case 3:
                        token = uuid(email, uuid.URL);
                        return [4 /*yield*/, new ResetPassword_1.default({
                                email: email,
                                token: token,
                                created_at: moment_1.default()
                            })];
                    case 4:
                        resetPassword = _a.sent();
                        resetPasswordSaved = resetPassword.save();
                        // transporter.sendMail({
                        //   to: email,
                        //   from: 'no-reply@namcoi.com',
                        //   subject: 'Request Reset Password',
                        //   html: ''
                        // })
                        // console.log(email);
                        return [2 /*return*/, 'ok'];
                }
            });
        }); }
    },
    Mutation: {
        signOut: function (parent, args, context, info) { return __awaiter(_this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                if (!context.isAuth) {
                    error = new apollo_server_core_1.AuthenticationError('Not Authenticated !');
                    error.code = 401;
                    throw error;
                }
                return [2 /*return*/, 'ok'];
            });
        }); }
    }
};
