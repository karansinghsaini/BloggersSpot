const express = require('express');
const votes = require('../models/votes');
const comments = require('../models/comments');
const async = require('async');
const route = express.Router();


// Getting all the comments
route.get('/:blog_id/get-comment', (req,res) => {
    comments.find({blog_id:req.params.blog_id})
    .populate('user_id', '_id username')
    .exec(function(err,comment){
        res.json({comment});
    });
});

// Posting a new comment
route.post('/:blog_id/add-comment/:user_id', (req,res) => {
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
});

// deleting a particular comment
route.delete('/:user_id/delete-comment/:comment_id', (req, res) => {
    var id = req.params.comment_id;
    var user_id = req.params.user_id;
    comments.findOne({_id: id}, (err, comment) => {
        if(comment.user_id.toString() === user_id) {
            comments.findByIdAndRemove(comment._id, function(err, commentd) {
            res.json({ id: commentd._id});
            });
        }
    });
});

// updating a particular comment
route.put('/:comment_id/update', (req, res) => {
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
});

// Posting Vote of the user
route.post('/:user_id/vote/:blog_id', (req,res)=>{
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
});



// remove the vote for the current user for a particular blog
route.get('/:blog_id/remove-vote/:user_id', (req,res) => {
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
});

module.exports = route;