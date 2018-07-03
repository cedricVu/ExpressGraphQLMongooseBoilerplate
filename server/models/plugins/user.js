'use strict';

module.exports = exports = function lastModifiedPlugin (schema, options) {

  schema.pre('save', async function () {
    console.warn('----------- Save hook processing ----------');
    if (this.password !== undefined) {
      try {
        console.warn('----------- Hash password in save hook ----------');
        this.password = await this.hashPassword(this.password);
      } catch (e) {
        throw e;
      }
    }
  });

};
