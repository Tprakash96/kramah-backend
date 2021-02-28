/* eslint-disable no-throw-literal */
/* eslint-disable no-undef */
const bcrypt = require('bcrypt');

const checkPassword = (user, pass) => {
  try {
    if (user === null) { return { err: 'Invalid Object' }; }
    // eslint-disable-next-line no-underscore-dangle
    const tokenObj = { ...user };
    const { password } = user;
    if (!bcrypt.compareSync(pass, password)) {
      return { err: 'Invalid Object' };
    }
    // eslint-disable-next-line no-param-reassign
    delete tokenObj.password;
    return { tokenObj };
  } catch (ex) {
    console.log(ex);
    return ex;
  }
};

module.exports = {
  checkPassword,
};
