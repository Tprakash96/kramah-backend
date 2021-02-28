/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('pino')();
const { validate } = require('../validator/index');
const { jwtSecret, jwtExpiry } = require('../../config');
const { checkPassword } = require('../utils/loginValidator');
const Users = require('../db/collections/users');
const { sendMail } = require('../utils/mail');

const signup = async (req, res) => {
  try {
    const {
      userName, email, password, phoneNumber, address,
    } = req.body;
    const { isError, errMsgs } = validate([
      { fieldName: 'email', value: email, type: 'email' },
      {
        fieldName: 'password',
        value: password,
        type: 'password',
      },
      { fieldName: 'phoneNumber', value: phoneNumber, type: 'phone' },
    ]);
    const passwordHash = bcrypt.hashSync(password, 10);
    if (isError) res.status(201).send({ status: 3000, errMsgs });

    await Users.insertMany([{
      userName, email, password: passwordHash, phoneNumber, address,
    }]);
    await sendMail(email);
    return res.status(200).send({ sucess: true });
  } catch (ex) {
    logger.error({ ex });
    if (ex.code === 11000) {
      return res.status(200).send({
        status: 3000,
        errMsgs: [{
          msg: 'email/phone number  already exist',
        },
        ],
      });
    }
    return res.status(500).send('something went wrong');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    const { err, tokenObj } = checkPassword(user, password);

    if (err) {
      return res.status(200).send({
        status: 3000,
        errMsgs: [{ msg: 'Invalid userName/Password' }],
      });
    }

    if (tokenObj) {
      const token = jwt.sign(tokenObj, jwtSecret, {
        algorithm: 'HS256',
        expiresIn: jwtExpiry,
      });
      return res.status(200).send({
        sucess: true,
        token,
      });
    }
  } catch (ex) {
    logger.error({ ex });
    return res.status(500).send('something went wrong');
  }
};

module.exports = {
  login,
  signup,
};
