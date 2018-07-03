'use strict';
import FS from 'fs';

const mutations = {};
FS.readdirSync(__dirname).forEach((fileName) => {
  if (fileName !== 'index.js') {
    if (fileName.split('.')[1] === 'js') {
      const moduleName = fileName.split('.')[0];
      Object.assign(mutations, eval(`require('./${moduleName}')`));
    }
  }
});

export default mutations;
