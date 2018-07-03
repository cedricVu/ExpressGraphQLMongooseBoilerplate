'use strict';
import FS from 'fs';

const bootstrapModules = {};
FS.readdirSync(__dirname).forEach((fileName) => {
  if (fileName !== 'index.js') {
    if (fileName.split('.')[1] === 'js') {
      const moduleName = fileName.split('.')[0];
      bootstrapModules[`${moduleName}Controller`] = eval(`require('./${moduleName}')`);
    }
  }
});

module.exports = bootstrapModules;
