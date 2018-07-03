'use strict';
import { GraphQLList, GraphQLID, GraphQLBoolean } from 'graphql';
import { Todo } from '../../models';
import TodoType from '../types/todo';

module.exports = {
  args: {
    userId: {type: GraphQLID},
    completed: {type: GraphQLBoolean},
  },
  type: new GraphQLList(TodoType),
  description: 'List of Todos',
  resolve: async (parent, args) => {
    try {
      return Todo.find(args).populate('user').exec();
    } catch (e) {
      throw e;
    }
  }
};
