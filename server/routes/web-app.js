'use strict';

import { webAppController } from '../controllers';

module.exports = (app, router) => {

  app.route('*').get(webAppController.index);

};
