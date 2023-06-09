const express = require('express');
const votes = require('../models/votes');
const comments = require('../models/comments');
const async = require('async');
const route = express.Router();
// module for creating JWT tokens.
var jwt = require('jsonwebtoken');
// importing our verifyToken function
const verifyToken = require('./verifyToken');
require('dotenv').config();

// Getting all the comments for a blog
route.get('/:blog_id/get-comment',verifyToken, (req,res) => {
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            comments.find({blog_id:req.params.blog_id})
            .populate('user_id', '_id username')
            .exec(function(err,comment){
                votes.find({})
                .then( votes_data => {
                    return res.json({
                        comments: comment,
                        votes: votes_data
                    });
                });
            });
        }
    });
});

// Getting all the comments
route.get('/get-comment',verifyToken, (req,res) => {
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            comments.find({})
            .populate('user_id', '_id username')
            .exec(function(err,comment){
                res.json({comments: comment});
            });
        }
    });
});

// Posting a new comment
route.post('/:blog_id/add-comment/:user_id',verifyToken, (req,res) => {
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            var user_id = req.params.user_id;
            var blog_id = req.params.blog_id;
            var comment = new comments({
                'comment': req.body.comment,
                'blog_id': blog_id,
                'user_id': user_id
            });

            comment.save( (err,commentz) => {
                if(err){
                    res.json({errors: "Comment Unsuccessfull"});
                }
                comments.findOne({_id: commentz._id})
                // populating the comment with the user data from the user db.
                .populate('user_id', '_id username')
                .exec(function(err,commentx){
                    res.json({comment: commentx});
                });
            });
        }
    });
});

// deleting a particular comment
route.delete('/:user_id/delete-comment/:comment_id',verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            var id = req.params.comment_id;
            var user_id = req.params.user_id;
            comments.findOne({_id: id}, (err, comment) => {
                if(comment.user_id.toString() === user_id) {
                    comments.findByIdAndRemove(comment._id, function(err, commentd) {
                    res.json({ id: commentd._id});
                    });
                }
            });
        }
    });
});

// updating a particular comment
route.put('/:comment_id/update', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            var id = req.params.comment_id;
            var blog_id = req.body.blog_id;
            var user_id = req.body.user_id;
            comments.findOne({_id: id}, (err, comment) => {
                if(comment.blog_id.toString() === blog_id && comment.user_id.toString() === user_id) {
                comments.findByIdAndUpdate(id, { $set: {comment: req.body.comment}}, (err, result) => {
                    if(!err) {
                    comments.findOne({_id: result._id})
                    .populate('user_id', '_id username email')
                    .exec(function(err, commentx) {
                        res.json({comment: commentx});
                    });
                    }
                });
                }
            });
        }
    });
});

// Posting Vote of the user
route.post('/:user_id/vote/:blog_id', verifyToken, (req,res)=>{
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            var blog_id = req.params.blog_id;
            var user_id = req.params.user_id;

            async.waterfall([
                function addNewVote(done) {
                var vote = new votes();
                vote.user_id = user_id;
                vote.blog_id = blog_id;
                vote.save(function(err, vote) {
                    done(null, vote);
                });
                },
                function getVote(vote, done) {
                votes.findOne({_id: vote._id})
                .populate('user_id', '_id username')
                .exec((err, vote) => {
                    done(null, vote);
                });
                }
            ], (err, vote) => {
                res.json({ votex: vote, vote: false });
            });
        }
    });
});



// remove the vote for the current user for a particular blog
route.get('/:blog_id/remove-vote/:user_id', verifyToken, (req,res) => {
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            var blog_id = req.params.blog_id;
            var user_id = req.params.user_id;
            votes.find({blog_id}, function(err, vote) {
                if(err){
                    res.json(err);
                }
                vote.map( vt => {
                    if(vt.user_id.toString() === user_id) {
                        votes.findByIdAndRemove(vt._id, function(err, vote) {
                            if(err){
                                res.json(err);
                            }
                        });                                             
                    }
                });
            });
        }
    });
});


// Posting Vote of the user for a Blog 
route.post('/:user_id/commentvote/:comment_id', verifyToken, (req,res)=>{
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            var comment_id = req.params.comment_id;
            var user_id = req.params.user_id;

            async.waterfall([
                function addNewVote(done) {
                var vote = new votes();
                vote.user_id = user_id;
                vote.comment_id = comment_id;
                vote.save(function(err, vote) {
                    done(null, vote);
                });
                },
                function getVote(vote, done) {
                votes.findOne({_id: vote._id})
                .populate('user_id', '_id username')
                .exec((err, vote) => {
                    done(null, vote);
                });
                }
            ], (err, vote) => {
                res.json({ votex: vote, vote: false });
            });
        }
    });
});

// remove the vote for the current user for a particular comment
route.get('/:comment_id/remove-commentvote/:user_id', verifyToken, (req,res) => {
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            var comment_id = req.params.comment_id;
            var user_id = req.params.user_id;
            votes.find({comment_id}, function(err, vote) {
                if(err){
                    res.json(err);
                }
                vote.map( vt => {
                    if(vt.user_id.toString() === user_id) {
                        votes.findByIdAndRemove(vt._id, function(err, vote) {
                            if(err){
                                res.json(err);
                            }
                        });                                             
                    }
                });
            });
        }
    });
});

module.exports = route;