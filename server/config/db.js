'use strict';

const db = {
  development: {
    HOST: 'mongodb://localhost/interaction-backend-db-development',
    IS_DEBUG: true
  },
  test: {
    HOST: 'mongodb://localhost/interaction-backend-db-development',
    IS_DEBUG: true
  },
  staging: {
  },
  production: {
  }
};

module.exports = db;
