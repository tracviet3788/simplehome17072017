/**
 * Created by UserPC on 7/16/2017.
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
//Register
router.post('/register', function(req,res,next){
    //res.send('REGISTER');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    //console.log("++++"+newUser.password);
    User.addUser(newUser, function(err,user){
        if(err){
            res.json({success:false,msg:'Failed to register user' + err});
        }else{
            res.json({success:true,msg:'ok'});
        }
    });
});
// Authenticate
router.get('/authenticate', function(req,res,next){
    res.send('AUTHENTICATE');
});
// Profile
router.get('/profile', function(req,res,next){
    res.send('PROFILE');
});
// Register
router.get('/register', function(req,res,next){
    res.send('REGISTER');
});
module.exports = router;
