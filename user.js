var mongoose    = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = Schema({
  username: {
    type: String,
    required: false,
  },
  group: {
    type: String,
    required: false,
  },
  ip: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  usedQuota: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('user', userSchema);
