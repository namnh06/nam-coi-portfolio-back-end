const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetPasswordSchema = new Schema({
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

const ResetPassword = mongoose.model('ResetPassword', ResetPasswordSchema);
export default ResetPassword;