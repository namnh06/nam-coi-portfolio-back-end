import { mergeResolvers } from 'merge-graphql-schemas';

import User from './User';

import Auth from './Auth';

const resolvers: any = [User, Auth];

export default resolvers;
