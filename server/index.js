'use strict';
import Express from 'express';
import BodyParser from 'body-parser';
import Cors from 'cors';
import FS from 'fs';
import Http from 'http';
import Path from 'path';
import Helmet from 'helmet';
import winstonInstance from './helpers/logger';
import Compress from 'compression';
import MethodOverride from 'method-override';
import { env, port, db } from './config/index';
import Morgan from 'morgan';
import HTTPStatus from 'http-status';
import APIError from './helpers/api-error';
import Response from './helpers/response';
import MemWatch from 'memwatch-next';
import Heapdump from 'heapdump';
import { connect } from './models/index';
import graphqlHTTP from 'express-graphql';
import { rootSchema } from './graphql/index';
import JWT from './helpers/jwt';

const app = Express();

connect(db);

app
  .use(Cors())
  .use(Compress())
  .use(MethodOverride())
  .use(BodyParser.json())
  .use(BodyParser.urlencoded({extended: true}))
  .use(Express.static(Path.resolve(__dirname, '..', 'public'), {maxAge: 31557600000}))
  .use(Helmet());

app
  .set('views', Path.join(__dirname, 'pages'))
  .set('view engine', 'ejs');
// Init graph

app.use('/graphql', [Cors(), JWT.verifyAccount], (req, res) => {
  graphqlHTTP({
    schema: rootSchema,
    rootValue: global,
    graphiql: true,
    context: { req }
  })(req, res)
});

// Bootstrap routes
const router = Express.Router();
const routePath = `${__dirname}/routes`;
FS.readdir(routePath, (e, fileNames) => {
  if (e) {
    winstonInstance.error(e);
  } else {
    for (const fileName of fileNames) {
      require(`${routePath}/${fileName}`)(app, router);
    }
    if (env === 'development' && env !== 'test') {
      app.use(Morgan('dev'));
    }
    app.get('/favicon.ico', (req, res) => res.status(204));
    app.use('/api', router);
    app.use(Response.convertError);
    app.use(notFoundAPIHandle);
    app.use((e, req, res, next) => {
      winstonInstance.error(e);
      return Response.error(res, e);
    });
  }
});

const notFoundAPIHandle = (req, res, next) => {
  const error = new APIError('API not found', HTTPStatus.NOT_FOUND);
  return next(error);
};

Http.createServer(app).listen(port, () => {
  console.log(`App listening on ${port}!`);
});

MemWatch.on('leak', (info) => {
  console.log('Leak:');
  console.log(info);
  Heapdump.writeSnapshot((err, fileName) => {
    console.log(fileName);
  });
});

MemWatch.on('stats', (stats) => {
  console.log('Stats:');
  console.log(stats);
});

module.exports = app;
