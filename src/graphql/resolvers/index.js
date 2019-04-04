import {
  mergeResolvers
} from "merge-graphql-schemas";

import User from './User';
import Test from './Test';
import Auth from './Auth'

const resolvers = [User, Test, Auth]

export default resolvers;