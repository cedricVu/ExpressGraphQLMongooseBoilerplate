'use strict';
import {GraphQLList, GraphQLString } from 'graphql';
import { User } from '../../models';
import UserType from '../types/user';

module.exports = {
  args: {
    firstName: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
    lastName: {type: GraphQLString},
    department: {type: GraphQLString},
    country: {type: GraphQLString},
  },
  type: new GraphQLList(UserType),
  description: 'List of Users',
  resolve: (parent, args) => {
    try {
      return User
        .find(args)
        .exec();
    } catch (e) {
      throw e;
    }
  }
};
