import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import rootQuery from './queries';
import rootMutation from './mutations';

module.exports = {

  rootSchema: new GraphQLSchema({
    query: rootQuery,
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: rootMutation
    })
  })

};

