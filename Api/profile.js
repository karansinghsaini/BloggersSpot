const express = require('express');
const users = require('../models/user');
const blogs = require('../models/blogs');
const votes = require('../models/votes');
const async = require('async');
//var _ = require('lodash');
// module for creating JWT tokens.
var jwt = require('jsonwebtoken');
// importing our verifyToken function
const verifyToken = require('./verifyToken');
require('dotenv').config();
const route = express.Router();
// for processing image
const multer = require('multer');
// secret key used while creating token.
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");


// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
// for storing profile image
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: "reactBlog",
        format: async (req, file) => 'png',
    },
});

// for storing profile image
// const Storage = multer.diskStorage({
//     destination: "./src/media/profile",
//     filename: function (req, file, cb) {
//         cb(null, Date.now()+file.originalname)
//       }
// });


// const fileFilter=(req, file, cb)=>{
//     if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
//         cb(null,true);
//     }else{
//         cb(null, false);
//     }
// }

const parser = multer({
    storage: storage
}).single('image');

route.get('/profile/:id',verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            users.find({_id: req.params.id}, (err, data) => {
                if (err) return res.json({
                    success: false,
                    error: err.message
                });
                return res.json({data});
            });
        }
    });
});

route.put('/updateprofilephoto/:id', verifyToken, parser, (req, res,next) => {
    console.log(req.file);
    var update = {
        "image": req.file.path
    };

    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } 
        if(req.params.id === authData.id){
            users.findByIdAndUpdate({ _id: req.params.id }, update, err => {
                if (err) return res.json({
                    success: false,
                    error: err
                });
                return res.json({
                    success: true,
                    authData
                });
            });
        }
        else{
            return res.json("Not Authorised");
        }
    });
});

route.put('/updateprofile/:id', verifyToken,  parser, (req, res,next) => {
    console.log(req.file);
    var update = {
        "fullname": req.body.fullname,
        "username": req.body.username,
        "bio": req.body.bio,
        "gender": req.body.gender,
        "phone": req.body.phone,
        "website": req.body.website,
        "image": req.file.path
    };

    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } 
        if(req.params.id === authData.id){
            users.findByIdAndUpdate({ _id: req.params.id }, update, err => {
                if (err) return res.json({
                    success: false,
                    error: err
                });
                return res.json({
                    success: true,
                    authData
                });
            });
        }
        else{
            return res.json("Not Authorised");
        }
    });
});   


route.get('/userblogs/:id',verifyToken, (req,res) => {
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            blogs.find({user_id: req.params.id}).sort({date_created: -1}).exec(function(err,blogs_data){
                if (err) return res.json({
                    success: false,
                    error: err.message
                });
                votes.find({})
                .then( votes_data => {
                    return res.json({
                        blogs: blogs_data,
                        votes: votes_data
                    });
                });
            });
        }
    });
});

// Adding a new follower
route.put('/:login_user_id/follow/:profile_user_id', verifyToken, (req,res)=>{
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            async.parallel([
                function addFollower() {
                    const followers = {
                        "user_id": req.params.login_user_id,
                        "name": req.body.follower_name
                    }
                    users.findByIdAndUpdate({ _id: req.params.profile_user_id }, {$push: {followers: followers }}, err => {
                        if (err) return res.json({
                            success: false,
                            error: err
                        });
                    });
                    
                },

                function addFollowing(){
                    const following = {
                        "user_id": req.params.profile_user_id,
                        "name": req.body.follow_name
                    }
                    users.findByIdAndUpdate({ _id: req.params.login_user_id }, {$push: { following : following}}, err => {
                        if (err) return res.json({
                            success: false,
                            error: err
                        });
                    });
                }
            ]);   
        }
    });
});


// Removing a follower
route.put('/:login_user_id/unfollow/:profile_user_id', verifyToken, (req,res)=>{
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            async.parallel([
                function removeFollower() {
                    var followers = {
                        "user_id": req.body.follower_id
                    }
                    users.findByIdAndUpdate({ _id: req.body.follow_id }, {$pull: {followers: followers }}, err => {
                        if (err) return res.json({
                            success: false,
                            error: err
                        });
                    });
                    
                },

                function removeFollowing(){
                    var following = {
                        "user_id": req.body.follow_id
                    }
                    users.findByIdAndUpdate({ _id: req.body.follower_id }, {$pull: { following : following}}, err => {
                        if (err) return res.json({
                            success: false,
                            error: err
                        });
                    });
                }
            ]);   
        }
    });
});

module.exports = route;