'use strict';
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import TodoType from './todo';

export default new GraphQLObjectType({
  name: 'User',
  description: 'Users in company',
  fields: () => ({
    id: {type: GraphQLID},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
    gender: {type: GraphQLString},
    department: {type: GraphQLString},
    country: {type: GraphQLString},
    todoCount: {
      type: GraphQLInt,
      resolve: (user) => {
        // execute db
        // return sumBy(Todos, todo => todo.userId === user.id ? 1:0);
      }
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve: (user, args) => {
        // db execute
        // return filter(Todos, todo => todo.userId === user.id);
      }
    }
  })
});

