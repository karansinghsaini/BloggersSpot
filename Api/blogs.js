const express = require('express');
const blogs = require('../models/blogs');
const votes = require('../models/votes');
//var _ = require('lodash');
// module for creating JWT tokens.
var jwt = require('jsonwebtoken');
// importing our verifyToken function
const verifyToken = require('./verifyToken');
require('dotenv').config();
const route = express.Router();



route.post('/newblog', verifyToken, (req,res) => {
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            const date = new Date();
            var blogModel = new blogs({
                'title': req.body.title,
                'content': req.body.content,
                'likes': req.body.likes,
                'author': authData.username,
                'user_id': authData.id,
                'date_created': date.toString()
              });
              blogModel.save(err => {
                if (err) return res.json({
                    success: false,
                    error: err.message
                });
                return res.json({
                    success: true,
                    status: 200
                });
            });
        }
    });
});

route.get('/getBlogs', verifyToken, (req, res) => {

    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            blogs.find({}).sort({date_created: -1}).exec(function(err,blogs_data){
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

route.get('/getBlog/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            blogs.findOne({_id: req.params.id}).exec(function(err,blogs_data){
                if (err) return res.json({
                    success: false,
                    error: err.message
                });
                votes.find({blog_id: req.params.id})
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

route.delete('/deleteBlogs/:id', verifyToken, function (req, res) {
    

    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            blogs.findByIdAndRemove({
                "_id": req.params.id
            }).then(function (blogs) {
                res.send(blogs);
            });
        }
    });
});   



route.put('/updateBlogs/:id', verifyToken, (req, res) => {
    const update = req.body;

    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            blogs.findByIdAndUpdate({ "_id": req.params.id }, update, err => {
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
    });
});   

module.exports = route;