import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  AuthenticationError
} from 'apollo-server-core';

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