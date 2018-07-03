'use strict';
import HTTPStatus from 'http-status';
import Config from '../config';
import APIError from './api-error';

export default class Response {

  static success (res, data) {
    res
      .json(data);
  }

  static error (res, e) {
    let stack = null;
    if (Config.env === 'development') {
      console.error(e);
      stack = e.stack;
    }
    res.status(e.status || HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: e.message,
        code: e.status,
        stack
      });
  }

  static convertError (e, req, res, next) {
    if (e.isJoi) {
      let message = '';
      for (const item of e.details) {
        message += `${item.message} \n`;
      }
      e = new APIError(message, e.status, true);
    } else if (!(e instanceof APIError)) {
      e = new APIError(e.message, e.status, e.isPublic);
    }
    return next(e);
  }

};
