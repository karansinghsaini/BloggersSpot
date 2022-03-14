const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        require: true
    },
    email: {
        type: String,
        lowercase: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    fullname: {
        type: String
    },
    website: {
        type: String
    },
    bio: {
        type: String
    },
    phone: {
        type: String
    },
    gender: {
        type: String
    },
    dob: {
        type: Date
    },
    image: {
        type: String
    },
    isValid: {
        type: Boolean
    },
    uniqueString: {
        type: String
    },
    followers: [
        {
            user_id: String,
            name: String
        }
    ],
    following: [
        {
            user_id: String,
            name: String
        }
    ]
});

module.exports = mongoose.model('users', userSchema);