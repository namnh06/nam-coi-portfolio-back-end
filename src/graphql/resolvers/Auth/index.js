import User from '../../../models/User';
import ResetPassword from '../../../models/ResetPassword';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  transporter
} from '../../../helper/email';
const uuid = require('uuid/v5');

import moment from 'moment';


export default {
  Query: {
    login: async (obj, args) => {
      const user = await User.findOne({
        email: args.email
      });

      if (!user) {
        const error = new Error('User Not Found.');
        error.code = 401;
        throw error;
      }

      const isEqual = await bcrypt.compare(args.password, user.password);

      if (!isEqual) {
        const error = new Error('Password is in correct');
        error.code = 401;
        throw error;
      }
      const token = jwt.sign({
        userId: user._id.toString(),
        email: user.email
      }, 'axon.active', {
        expiresIn: '1h'
      });

      return {
        token: token,
        userId: user._id.toString()
      }
    },
    requestResetPassword: async (obj, args) => {
      const email = args.email;
      const oldResetPassword = await ResetPassword.findOne({
        email
      });
      if (!!oldResetPassword) {
        const token = uuid(email, uuid.DNS);
        const updateResetPassword = await oldResetPassword.updateOne({
          token,
          created_at: moment()
        });

        return 'updated';
      }

      const token = uuid(email, uuid.URL);
      const resetPassword = await new ResetPassword({
        email,
        token,
        created_at: moment()
      })
      const resetPasswordSaved = resetPassword.save();
      // transporter.sendMail({
      //   to: email,
      //   from: 'no-reply@namcoi.com',
      //   subject: 'Request Reset Password',
      //   html: ''
      // })
      // console.log(email);
      return 'ok';
    }
  },
  Mutation: {
    signOut: async (parent, args, context, info) => {
      if (!context.isAuth) {
        const error = new AuthenticationError('Not Authenticated !');
        error.code = 401;
        throw error;
      }
      return 'ok';
      // if (!req.isAuth) {
      //   return 'error';
      // }
      // return 'ok';
    }
  }
}