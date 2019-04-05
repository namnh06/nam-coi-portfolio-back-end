import bcrypt from 'bcryptjs';
import User from '../../../models/User';

export default {
  Query: {
    testUser: () => {
      return 'test user';
    },
    user: (obj, args) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        })
      })
    },
    users: () => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          })
      })
    },
    truncateUsersTable: () => {
      return new Promise((resolve, reject) => {
        User.deleteMany({})
          .exec((err, res) => {
            err ? reject('error') : resolve('ok')
          })
      })
    }
  },
  Mutation: {
    createUser: async (obj, args) => {
      console.log(args);
      const hashedPw = await bcrypt.hash(args.CreateUserInput.password, 12);
      const newUser = await new User({
        name: args.CreateUserInput.name,
        email: args.CreateUserInput.email,
        password: hashedPw
      });
      const createdUser = await newUser.save();
      return {
        ...createdUser._doc,
        _id: createdUser._id.toString()
      }
    }
  }
}