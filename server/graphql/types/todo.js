'use strict';
import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';
import UserType from './user';

export default new GraphQLObjectType({
  name: 'Todo',
  description: 'Task for user',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLID)},
    title: {type: GraphQLString},
    completed: {type: GraphQLBoolean},
    user: {type: UserType}
  })
});

