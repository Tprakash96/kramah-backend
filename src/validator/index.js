/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
const validator = require('validator');
const {
  EMAIL_IS_NOT_VALID,
  PASSWORD_IS_NOT_VALID,
  PHONE_IS_NOT_VALID,
} = require('../utils/response-status');

const isEmail = (value) => validator.isEmail(value);

const verifyPassword = (value) => value.length >= 4 && value.length <= 16;

const verifyPhone = (value) => validator.isMobilePhone(value);

const validate = (rules) => {
  let isError = false;
  const errMsgs = [];
  rules.forEach((rule) => {
    if (rule.type === 'email' && !isEmail(rule.value)) {
      isError = true;
      errMsgs.push({
        errCode: EMAIL_IS_NOT_VALID,
        msg: 'Email is not valid',
      });
    } else if (rule.type === 'password' && !verifyPassword(rule.value)) {
      isError = true;
      errMsgs.push({
        errCode: PASSWORD_IS_NOT_VALID,
        msg: `${rule.fieldName} should be 4 to 16 characters`,
      });
    } else if (rule.type === 'phone' && !verifyPhone(rule.value)) {
      isError = true;
      errMsgs.push({
        errCode: PHONE_IS_NOT_VALID,
        msg: `${rule.fieldName} is not valid`,
      });
    }
  });
  return { isError, errMsgs };
};

module.exports = {
  isEmail,
  verifyPassword,
  validate,
};
