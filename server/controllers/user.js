'use strict';
import { User } from '../models';
import JWT from '../helpers/jwt';

class UserController {

  async login (req, res, next) {
    try {
      const user = await User
        .findOne({
          email: req.body.email
        });
      if (!user) {
        return next(new Error('User is not found'));
      }
      const isValidPassword = await user.isValidPassword(req.body.password);
      if (!isValidPassword) {
        return next(new Error('Invalid password'));
      }
      return res.status(200).json(
        {
          token: await JWT.sign({
            email: user.email
          })
        }
      );
    } catch (e) {
      return next(e);
    }
  }

  getAll (req, res, next) {
    User
      .getAll()
      .then(data => res.json(data))
      .catch(e => next(e));
  }

  getOne (req, res, next) {
    const id = req.params.id;
    User
      .findById({ id: id })
      .lean()
      .then(data => res.json(data))
      .catch(e => next(e));
  }

  createOne (req, res, next) {
    const user = new User({
      name: req.body.name
    });

    user.save()
      .then(savedUser => res.json(savedUser))
      .catch(e => next(e));
  }

  async updateOne (req, res, next) {
    const id = req.params.id;
    try {
      const user = await User.get(id);
      user.set(req.body);
      user
        .save()
        .then(user => res.json(user))
        .catch(e => next(e))
    } catch (e) {
      return next(e);
    }
  }

  async deleteOne (req, res, next) {
    try {
      const id = req.params.id;
      const user = await User.get(id);
      user.delete()
        .then(deletedUser => res.json(deletedUser))
        .catch(e => next(e));
    } catch (e) {
      return next(e);
    }
  }

}

module.exports = new UserController();
