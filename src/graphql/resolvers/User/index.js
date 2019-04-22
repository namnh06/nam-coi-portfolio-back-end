import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import {
  transporter
} from '../../../helper/email';
// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');

// const transporter = nodemailer.createTransport(sendgridTransport({
//   auth: {
//     api_key: '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'
//   }
// }))

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
      const email = args.CreateUserInput.email;
      const hashedPw = await bcrypt.hash(args.CreateUserInput.password, 12);
      const newUser = await new User({
        name: args.CreateUserInput.name,
        email,
        password: hashedPw
      });
      const createdUser = await newUser.save();
      transporter.sendMail({
        to: email,
        from: 'no-reply@namcoi.com',
        subject: 'Congratulation, you are on board!',
        html: '<h1>SignUp Created</h1>'
      });
      return {
        ...createdUser._doc,
        _id: createdUser._id.toString()
      }
    }
  }
}