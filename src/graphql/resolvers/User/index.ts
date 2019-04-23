import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import { transporter } from '../../../helper/email';
import { IUser } from '../../../utilities/IUser';

export default {
  Query: {
    testUser: () => {
      return 'test user';
    },
    user: (obj: any, args: any) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err: any, res: any) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    users: () => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err: any, res: any) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
    truncateUsersTable: () => {
      return new Promise((resolve, reject) => {
        User.deleteMany({}).exec((err: any, res: any) => {
          err ? reject('error') : resolve('ok');
        });
      });
    }
  },
  Mutation: {
    createUser: async (obj: any, args: any) => {
      const email = args.CreateUserInput.email;
      const user: IUser = await User.where({ email }).findOne(
        (err: any, user: IUser) => {
          if (err) console.log(err);
          else return user;
        }
      );

      if (!!user) {
        return {
          ...user._doc
        };
      }

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
      };
    }
  }
};
