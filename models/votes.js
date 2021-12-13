const mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'users', require: true
  },
  blog_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'blogs', require: true
  },
  comment_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'comments', require: true
  }
});

module.exports = mongoose.model('votes', VoteSchema);
