const express = require('express');
const users = require('../models/user');
const blogs = require('../models/blogs');
const votes = require('../models/votes');
//var _ = require('lodash');
// module for creating JWT tokens.
var jwt = require('jsonwebtoken');
// importing our verifyToken function
const verifyToken = require('./verifyToken');
const route = express.Router();

// secret key used while creating token.
const secret = '53ddf1277aa9cce7f64fd176d566553322a86c139047a1d9c7a8e09c2500029ba167c9efba48fe49e9c81308f4d3c03c64016ad05478b3785432aea52ab5043a';


route.get('/profile/:id', (req, res) => {
    users.find({_id: id}, (err, data) => {
        if (err) return res.json({
            success: false,
            error: err.message
        });
        return res.json({data});
    });
});


route.put('/updateprofile/:id', verifyToken, (req, res) => {
    const update = req.body;

    jwt.verify(req.token, secret, (err, authData) => {
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


route.get('/userblogs/:id', (req,res) => {
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
});


module.exports = route;