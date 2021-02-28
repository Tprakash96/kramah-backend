const mongoose = require('mongoose');
const { currentTime } = require('../../utils/time');

module.exports = mongoose.model('Users', {
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: currentTime(),
  },
  updatedAt: {
    type: Date,
    default: currentTime(),
  },
});
