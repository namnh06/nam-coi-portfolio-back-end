import {
  mergeTypes
} from 'merge-graphql-schemas';

import User from './User';
import Test from './Test';
import Auth from './Auth';

const typeDefs = [User, Test, Auth];

export default mergeTypes(typeDefs, {
  all: true
});