'use strict';
import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import userType from '../types/user';
import { User } from '../../models';

module.exports = {
  addUser: {
      type: userType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        password: {
          type: new GraphQLNonNull(GraphQLString)
        },
        firstName: {
          type: GraphQLString
        },
        lastName: {
          type: GraphQLString
        },
        country: {
          type: GraphQLString
        },
        department: {
          type: GraphQLString
        }
      },
      async resolve (root, params, context) {
        // await JWT.verifyAccount(context.req);
        const uModel = new User(params);
        const newUser = uModel.save();
        if (!newUser) {
          throw new Error('Error');
        }
        return newUser
      }
  },

  updateUser: {
    type: userType,
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLID)
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      country: {
        type: GraphQLString
      },
      department: {
        type: GraphQLString
      }
    },
    resolve (root, params) {
      return User.findByIdAndUpdate(
        params.id,
        { $set: { name: params.name } },
        { new: true }
      )
        .catch(err => new Error(err));
    }
  },

  deleteUser: {
    type: userType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve (root, params) {
      const removedUser = User.findByIdAndRemove(params.id).exec();
      if (!removedUser) {
        throw new Error('Error')
      }
      return removedUser;
    }
  }
};
