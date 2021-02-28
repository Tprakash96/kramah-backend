const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.PORT);

const ENV = process.env;

module.exports = {
  port: parseInt(ENV.PORT || '8080', 10),
  remoteUrl: ENV.REMOTE_URL,
  localUrl: ENV.MONGO_DB_LOCAL,
  jwtSecret: ENV.JWT_SECRET_KEY,
  jwtExpiry: ENV.JWT_EXPIRE_TIME,
  hostName: ENV.HOST_NAME,
};
