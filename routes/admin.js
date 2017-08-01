/**
 * Created by UserPC on 7/16/2017.
 */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var multipart           = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs                  = require('fs');
var cfpath = require('../config/default.js');
var functions = require('../libs/functions.js');
const Post = require('../models/home/post');
const User = require('../models/user');
const General = require('../models/admin/general');
const Administrator = require('../models/admin/administrator');
const Category = require('../models/admin/category');
const subCategory = require('../models/admin/subcategory');

//Controller
const categoryController = require('../controllers/admin/categoryctr');
const administratorController = require('../controllers/admin/administratorctr');
const generalctrController = require('../controllers/admin/generalctr');

router.use(bodyParser.urlencoded({
    extended: true
}));

//config passport
var passport = require('passport');
var session = require('client-sessions');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
router.use(session({
    cookieName: 'session',
    secret: 'random string',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));
passport.serializeUser(function(administrator, done) {
    done(null, administrator);
});

passport.deserializeUser(function(administrator, done) {
    done(null, administrator);
});
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(
    function (username,password,done) {
        Administrator.getUserByUsername(username, (err, administrator) => {
            console.log(administrator);
            if(err){
                return done(err);
            };
            if(!administrator){
              return done(null, false, { message: 'Incorrect username and password' });
            }
            Administrator.comparePassword(password, administrator.password, (err, isMatch) => {
              if(err) throw err;
              if(isMatch){
                return done(null, administrator);
              } else {
                return done(null, false, { message: 'Incorrect username and password' });
              }
            });
          });
    }
))
//Admin Profile
router.get('/profile',isAuthenticated, function(req,res){
    administratorController.getProfile(req,res);
});
//Admin Profile
router.get('/p-cpass',isAuthenticated, function(req,res){
    administratorController.getPassProfile(req,res);
});
//Admin Change pass submit
router.post('/p-cpass',isAuthenticated, function(req,res){
    administratorController.changePassProfile(req,res);
});
//Admin Profile submit
router.post('/profile',isAuthenticated, function(req,res){
    administratorController.updateProfile(req,res);
});
//Admin General
router.get('/general',isAuthenticated, function(req,res){
  generalctrController.getGeneral(req,res);
    
});
//Admin administrator
router.get('/administrator', isAuthenticated,function(req,res){
    res.render('admin/administrator', { title : 'Thông tin thành viên' , user : req.user, functions : functions});
});
//Submit Admin General
router.post('/general', isAuthenticated,function(req,res){
    generalctrController.addGeneral(req,res);
});
//Submit Add Admin
router.post('/administrator',isAuthenticated, function(req,res){
    administratorController.addAdministrator(req,res);
});
// Authenticate
router.get('/login', function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/admin/administrator');
    }else{
        res.render('admin/login');
    }
});
router.get('/edit-cate/:title', isAuthenticated, function(req, res) {
    categoryController.getEditAdminCategory(req,res);
});
router.post('/edit-cate/:title', multipartMiddleware, isAuthenticated, function(req, res) {
    categoryController.updateCategory(req,res);
});
router.get('/edit-subcate/:title', isAuthenticated, function(req, res) {
    categoryController.getEditAdminSubCategory(req,res);
});
router.post('/edit-subcate/:title', isAuthenticated, function(req, res) {
    categoryController.updateSubCategory(req,res);
});
//test
router.get('/test', function(req, res){
  var test = subCategory.getSubcategory();
  //res.send(test);
  Category.getAllCategory(function (err, category){
      if(!err){
        res.send(category);
      }else{
        //res.send(err);
      }
    });
  
});
//logout
router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/admin/login');
});
// Authenticate
router.post('/login', passport.authenticate('local', { successRedirect: '/admin/administrator',failureRedirect: '/admin/login'}));

// Category
router.get('/add-categories',isAuthenticated, function(req,res){
    res.render('admin/add-categories', {user : req.user});
});
// Submit Category
router.post('/add-categories', multipartMiddleware,isAuthenticated, function(req,res){
   categoryController.addCategory(req,res);
});
// Manager Category
router.get('/mag-categories',isAuthenticated, function(req,res){
    categoryController.getAdminCategory(req,res);
});


// Simple route middleware to ensure user is authenticated.
function isAuthenticated(req,res,next){
   if(req.user)
      return next();
   else
      res.redirect('/admin/login');
}

module.exports = router;
