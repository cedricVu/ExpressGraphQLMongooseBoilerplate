'use strict';

import JWT from 'jsonwebtoken';
import { jwtCredentials } from '../config/index';

export default class JWTHelper {

    static async verifyAccount (req, res, next) {
      return new Promise((resolve, reject) => {
        try {
          const token = JWTHelper.getToken(req);
          if (token === null) {
            if (next) {
              return next(new Error('Authentication failed'))
            }
            return reject(new Error('Authentication failed'));
          }
          const user = JWTHelper.verify(token);
          req.user = user;
          if (next) {
            return next();
          }
        } catch (e) {
          if (next) {
            return next(e);
          }
          return reject(new Error(e));
        }
      });
    }

    static getToken(req) {
        let authorization = null;
        let token = null;
        if (req.query) {
            if (req.query.token) {
                return req.query.token;
            }
        }
        if (req.authorization) {
            authorization = req.authorization;
        }
        if (req.headers) {
            authorization = req.headers.authorization;
        } else if (req.socket) {
            authorization = req.socket.handshake.headers.authorization;
        }
        if (authorization) {
            const parts = authorization.split(' ');
            if (parts.length === 2) {
                const scheme = parts[0];
                if (/^Bearer$/i.test(scheme)) {
                    token = parts[1];
                }
            }
        }
        return token;
    }

    static async sign(payload, expiresIn = 2592000) {
        return new Promise((resolve, reject) => {
            JWT.sign(
                payload,
                jwtCredentials.privateKey,
                {
                    algorithm: 'RS256',
                    expiresIn: expiresIn
                },
                (error, token) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(token);
                    }
                }
            )
        });
    }

    static async verify(token) {
        return new Promise((resolve, reject) => {
            JWT.verify(
                token,
                jwtCredentials.publicKey,
                {
                    algorithm: 'RS256'
                },
                (error, decoded) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                }
            )
        });
    }

}
