import FS from 'fs';
import dotEnv from 'dotenv';
import Path from 'path';

dotEnv.config();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '4000';

const bootstrapModules = {
  env,
  port,
  jwtCredentials: {
    privateKey: FS.readFileSync(Path.resolve(__dirname, '..', 'config', 'cert', `${env}.private.key`), 'utf8'),
    publicKey: FS.readFileSync(Path.resolve(__dirname, '..', 'config', 'cert', `${env}.public.key`), 'utf8')
  },
};

FS.readdirSync(__dirname).forEach((fileName) => {
  if (fileName !== 'index.js') {
    if (fileName.split('.')[1] === 'js') {
      const moduleName = fileName.split('.')[0];
      bootstrapModules[`${moduleName}`] = eval(`require('./${moduleName}')['${env}']`);
    }
  }
});

module.exports = bootstrapModules;
