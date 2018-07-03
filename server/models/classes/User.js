'use strict';
import BaseModelClass from "./Base";
import Bcrypt from 'bcrypt';

export default class UserModelClass extends BaseModelClass {

  // `fullName` becomes a virtual
  get fullName () {
    return this.firstName + ' ' + this.lastName;
  }

  // `hashPassword()` becomes a document method
  hashPassword (password) {
    return new Promise((resolve, reject) => {
      try {
        Bcrypt.hash(password, 10, (e, hash) => {
          if (e) {
            return reject(new Error(e));
          }
          return resolve(hash);
        });
      } catch (e) {
        return reject(new Error(e));
      }
    });
  }

  isValidPassword (password) {
    console.log(this.password);
    return new Promise((resolve, reject) => {
      try {
        Bcrypt.compare(password, this.password, (e, isValid) => {
          if (e) {
            return reject(new Error(e));
          }
          return resolve(isValid);
        });
      } catch (e) {
        return reject(new Error(e));
      }
    });
  }

}
