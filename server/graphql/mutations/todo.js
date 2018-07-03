'use strict';
import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import todoType from '../types/todo';
import { Todo } from '../../models';

module.exports = {
  addTodo: {
      type: todoType,
      args: {
        user: {
          type: new GraphQLNonNull(GraphQLID)
        },
        title: {
          type: GraphQLString
        },
        isCompleted: {
          type: GraphQLString
        }
      },
      resolve (root, params) {
        const todoModel = new Todo(params);
        const newTodo = todoModel.save();
        if (!newTodo) {
          throw new Error('Error');
        }
        return newTodo
      }
  },

  updateTodo: {
    type: todoType,
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLID)
      },
      title: {
        type: GraphQLString
      },
      isCompleted: {
        type: GraphQLString
      }
    },
    resolve (root, params) {
      return Todo.findByIdAndUpdate(
        params.id,
        { $set: params },
        { new: true }
      )
        .catch(err => new Error(err));
    }
  },

  deleteTodo: {
    type: todoType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve (root, params) {
      const removedTodo = Todo.findByIdAndRemove(params.id).exec();
      if (!removedTodo) {
        throw new Error('Error')
      }
      return removedTodo;
    }
  }

};
