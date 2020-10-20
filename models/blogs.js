const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    likes: {
        type: Number
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
      }
});

module.exports = mongoose.model('blogs', blogsSchema);