var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    blog_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'blogs', require: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users', require: true
    },
    date_created: {
        type: Date, default: Date.now
    },
});

module.exports = mongoose.model('comments', commentSchema);