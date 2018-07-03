'use strict';
import FS from 'fs';
import Mongoose from 'mongoose';
import Util from 'util';
import Promise from 'bluebird';
import globalPlugin from './plugins/global';

Mongoose.plugin(globalPlugin);

const bootstrapModules = {
  connect: (db) => {
    Mongoose.connect(
      db.HOST,
      {
        poolSize: 2,
        promiseLibrary: Promise
      }
    );
    Mongoose.connection.on('error', () => {
      throw new Error(`unable to connect to database: ${db.HOST}`);
    });
    if (db.IS_DEBUG) {
      const debug = require('debug')('express-mongoose-es6-rest-api:index');
      Mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, Util.inspect(query, false, 20), doc);
      });
    }
  }
};

FS.readdirSync(__dirname).forEach((fileName) => {
  if (fileName !== 'index.js') {
    if (fileName.split('.')[1] === 'js') {
      const moduleName = fileName.split('.')[0];
      bootstrapModules[`${moduleName}`] = eval(`require('./${moduleName}')`);
    }
  }
});

module.exports = bootstrapModules;
