/* eslint-disable comma-dangle */
const { login, signup } = require('../controller/login');

module.exports = (app) => {
  app.post('/api/login', login);
  app.post('/api/signup', signup);
};
