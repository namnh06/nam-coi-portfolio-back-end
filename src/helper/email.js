const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

export const transporter = nodemailer.createTransport(sendGridTransport({
  auth: {
    api_key: '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'
  }
}));