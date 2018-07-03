'use strict';

export default class UserValidation {

  static validateEmail (email) {
    let emailExpress = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailExpress.test(email)
  }

};
