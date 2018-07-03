'use strict';
import Bcrypt from 'bcrypt';

export default class Encryption {

  static hash (input) {
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

  static compareHash (input, hash) {
    return new Promise((resolve, reject) => {
      try {
        Bcrypt.compare(input, hash, (e, isValid) => {
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
