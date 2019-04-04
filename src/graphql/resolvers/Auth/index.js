import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default {
  Query: {
    login: async (obj, args) => {
      console.log(args);
      const user = await User.findOne({
        email: args.email
      });
      console.log(user);
      if (!user) {
        const error = new Error('User Not Found.');
        error.code = 401;
        throw error;
      }
      console.log(args.password.toString());
      const isEqual = await bcrypt.compare(args.password, user.password);
      console.log(isEqual);
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
  }
}