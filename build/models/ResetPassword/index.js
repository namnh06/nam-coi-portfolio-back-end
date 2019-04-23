"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ResetPasswordSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
});
var ResetPassword = mongoose.model('ResetPassword', ResetPasswordSchema);
exports.default = ResetPassword;
