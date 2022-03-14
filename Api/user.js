const express = require('express');
const users = require('../models/user');
const comments = require('../models/comments');
var _ = require('lodash');
const async = require('async');
const blogs = require('../models/blogs');
//module to encrypt passwords.
var bcrypt = require('bcryptjs');
// module for creating JWT tokens.
var jwt = require('jsonwebtoken');
//var nodemailer = require('nodemailer');
// importing our verifyToken function
const verifyToken = require('./verifyToken');
const route = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');

// Register Route. Saving the users data in the users model. 
route.post('/createUser',async (req,res) => {

    const email = req.body.email
    const unqString = randString()
    // this script is for encrypting the password using a hash function
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          var userModel = new users({
            'username': req.body.username,
            'email': req.body.email,
            'password': hash,
            'isValid': false,
            'uniqueString': unqString,
            'followers': [],
            'following': []
          });
            userModel.save((err,user) => {
                if (err) return res.json({
                    success: false,
                    error: err.message
                });
                else{
                    res.json(user);
                    sendMail(email,unqString); 
                }
            });    
        });
    });
});


// Login Route. Returns the data and the token back as a response.
route.post('/loginUser',async (req,res) => {
    // seperating the content of the request body.
    const { identifier, password } = req.body;
    // Finding the user from the User model from the DB.
    users.find({$or: [ {'username': identifier}, {'email': identifier} ]} , function(err, user) {
    // Checking if the user is present or not
    if(!_.isEmpty(user)) {
        // storing the user data we got from the User model into the data variable for future use.
        var user_data = {
            id: user[0]._id,
            username: user[0].username,
            email: user[0].email
            };
        // Comparing the password provided by the user while loggingIn with the password stored in the DB
        bcrypt.compare(password, user[0].password, function(err, isMatch) {
        // Checking for errors and if the passwords are similar    
        if(!err && isMatch) {
            // creating a JWT token 
            var token = jwt.sign(user_data, process.env.Secret, { expiresIn: "4h" });
            res.json({token,user_data});
        } else {
            res.status(401).json({ error: 'Sorry, your username or password was incorrect. Please double-check your password.' });
        }
        });
    }
    if(_.isEmpty(user)) {
        res.status(401).json({ errors: 'Sorry, no user found' });
    }
    });
});

route.get('/getUsers', (req, res) => {
    users.find({}).sort({ username: 1}).exec(function(err, userdata){
        if (err) return res.json({
            success: false,
            error: err.message
        });
        return res.json(userdata);
    });
});


route.get('/getUser/:id', (req,res) => {
    users.findOne({
        "_id": req.params.id
    }).then( function (error,user) {
        if(error){
            res.send(error);
        }
        else{
            res.send(user);
        }
    });
});

route.delete('/deleteUser/:id', verifyToken, function (req, res) {
    

    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            async.parallel([
             function removeUser(done){
                    users.findByIdAndRemove({
                    "_id": req.params.id
                }).then(function (user) {
                    res.send(user);
                });
            },
            function removeBlogs(done){
                blogs.deleteMany({ user_id: req.params.id}, err => {
                    if (err) {
                        return res.json({
                        success: false,
                        error: err
                        });
                }
            });
            },
            function removeComments(done){
                comments.deleteMany({ user_id: req.params.id}, err => {
                    if (err) {
                        return res.json({
                        success: false,
                        error: err
                        });
                    }
                });
            }
        ]);
        }
    });
});   



route.put('/updateUser/:id', verifyToken, (req, res) => {
    const update = req.body;

    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            users.findByIdAndUpdate({ "_id": req.params.id }, update, err => {
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

// Update Password.
route.put('/updatePassword/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.Secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.newpass, salt, function(err, hash) {
                    if(err) {
                        res.json({
                            error: "Failed"
                        });
                    } else {
                        const update = {
                            password: hash
                        };
                        users.findByIdAndUpdate({ "_id": req.params.id }, update, err => {
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
        }
    });
});

const randString = () => {
    const len = 9
    let randStr = ''
    for ( let i=0;i<len;i++){
        const ch = Math.floor((Math.random() * 10) + 1)
        randStr += ch
    }
    return randStr
}

const sendMail = async (email,unqString) => {
    console.log("Sending Mail");


    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    
    // create reusable transporter object using the default SMTP transport
    let Transport = nodemailer.createTransport({
        name: "smtp.ethereal.email",
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
        },
    });

    var mailOptions;
    let sender = "bloggerspotofficial@gmail.com"
    mailOptions = {
        from: sender, // sender address
        to: email, // list of receivers
        subject: "Register to BloggersSpot", // Subject line
        html: `Press <a href=http://localhost:3000/verify/${unqString} > here </a> to verify your email and get registeres. Thanks and good luck with your new journey.`, // html body
      };


    Transport.sendMail(mailOptions, function(error, res){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + res.response);
            res.status(200);
        }
    }); 
}


route.get('/verify:uniqueString', async (req,res) => {
    const { uniqueString } = req.params
    const user = await users.findOne({ uniqueString: uniqueString})
    if (user){
        user.isValid = true
        await user.save()
        res.redirect('/')
    } else {
        res.json('User Not Found')
    }
});

module.exports = route;