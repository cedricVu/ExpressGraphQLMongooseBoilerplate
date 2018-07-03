'use strict';
import UserValidation from '../validations/user';
import {userController} from '../controllers';

module.exports = (app, router) => {

  router
    .route('/users')
    .get(userController.getAll)
    .post(UserValidation.create, userController.createOne);

  router
    .route('/users/:id')
    .get(userController.getOne)
    .put(userController.updateOne)
    .delete(userController.deleteOne);

  router
    .route('/health-check')
    .get((req, res) => {
      res.send('OK');
    });

  app
    .route('/todo')
    .get((req, res) => {
      return res.render('index')
    });

  // router.route('/users/:id')
  //   .put(controllers.userController.update)

  router
    .route('/login')
    .post(userController.login);

};
