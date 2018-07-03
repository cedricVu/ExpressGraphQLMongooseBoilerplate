'use strict';
import FS from 'fs';
import { GraphQLObjectType } from 'graphql';

const fields = {};
FS.readdirSync(__dirname).forEach((fileName) => {
  if (fileName !== 'index.js') {
    if (fileName.split('.')[1] === 'js') {
      const moduleName = fileName.split('.')[0];
      fields[`${moduleName}`] = eval(`require('./${moduleName}')`);
    }
  }
});

export default new GraphQLObjectType({
  name: 'TodoAppSchema',
  description: 'Root Todo App Schema',
  fields: () => (fields)
});
