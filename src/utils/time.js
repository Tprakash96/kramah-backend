/* eslint-disable implicit-arrow-linebreak */
const moment = require('moment');

const diffMinutes = (time1, time2) =>
  moment.duration(moment(time1).diff(time2)).asMinutes();
const formatTime = (tm, format) => moment(tm).format(format);
const currentTime = () => moment().format('YYYY-MM-DD');
const addTime = (startTime, format, value, type) =>
  moment(startTime, format).add(value, type).format(format);

module.exports = { diffMinutes, formatTime, currentTime, addTime };
