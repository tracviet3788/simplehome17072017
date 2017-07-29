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
    if(req.user.username){
        Administrator.getUserByUsername(req.user.username, (err, administrator) => {
            if(!err) {
                res.render('admin/profile', { user : administrator});
            }else{
                res.render('admin/error', { error : err});
            }
        });
    }
});
//Admin Profile
router.get('/p-cpass',isAuthenticated, function(req,res){
    if(req.user.username){
        Administrator.getUserByUsername(req.user.username, (err, administrator) => {
            if(!err) {
                res.render('admin/profile-cpass', { user : administrator});
            }else{
                res.render('admin/error', { error : err});
            }
        });
    }
});
//Admin Change pass submit
router.post('/p-cpass',isAuthenticated, function(req,res){
    if(req.body.npassword != req.body.cnpassword){
        res.render('admin/profile-cpass', { error : 'Mật khẩu không khớp',user : req.user});
    }else{
        var newAdministrator = new Administrator;
        newAdministrator.password = req.body.npassword;
        Administrator.comparePassword( req.body.opassword, req.user.password, (err, isMatch) => {
              if(err) throw err;
              if(isMatch){
                Administrator.updatePasswordUser(req.body.usernamehd, newAdministrator, function(err,administrator){
                    if(!err) {
                        res.render('admin/profile-cpass', { success : 'Mật khẩu đã được cập nhật', user : req.user});
                    }else{
                        res.render('admin/error', { error : err});
                    }
                });
              } else {
                res.render('admin/profile-cpass', { error : 'Mật khẩu cũ không khớp',user : req.user});
              }
        });
        
    }
});
//Admin Profile submit
router.post('/profile',isAuthenticated, function(req,res){
    var newAdministrator = {};
    newAdministrator.fullname = req.body.fullname;
    newAdministrator.udescriptions = req.body.udescriptions;
    newAdministrator.email = req.body.email;
    newAdministrator.address = req.body.address;
    Administrator.updateUserByUsername(req.body.usernamehd, newAdministrator, function(err,administrator){
        if(!err) {
            res.redirect('/admin/profile');
        }else{
            res.render('admin/error', { error : err});
        }
    });
});
//Admin General
router.get('/general',isAuthenticated, function(req,res){
    Post.getAllPosts(function(err,post){
       // Sort by blog latest
        post = post.sort({'id' : -1});
        res.render('admin/general', { title : 'Thông tin website' , posts : post , user : req.user, functions : functions});
    });
});
//Admin administrator
router.get('/administrator', isAuthenticated,function(req,res){
    Post.getAllPosts(function(err,post){
        console.log(req.user);
       // Sort by blog latest
        post = post.sort({'id' : -1});
        res.render('admin/administrator', { title : 'Thông tin thành viên' , posts : post, user : req.user, functions : functions});
    });
});
//Submit Admin General
router.post('/general', isAuthenticated,function(req,res){
    var newGeneral = new General;
    newGeneral.website = req.body.website;
    newGeneral.company = req.body.company;
    newGeneral.descriptions = req.body.descriptions;
    newGeneral.hotline = req.body.hotline;
    newGeneral.email = req.body.email;
    newGeneral.address = req.body.address;
    General.addGeneral(newGeneral, function(err,general){
        if(!err) {
             res.redirect('/admin/general');
        }else{
            console.log(err);
        }
    });
});
//Submit Admin General
router.post('/administrator',isAuthenticated, function(req,res){
    var newAdministrator = new Administrator;
    newAdministrator.fullname = req.body.fullname;
    newAdministrator.username = req.body.username;
    newAdministrator.udescriptions = req.body.udescriptions;
    newAdministrator.password = req.body.password;
    newAdministrator.email = req.body.email;
    newAdministrator.address = req.body.address;
    Administrator.addAdministrator(newAdministrator, function(err,administrator){
        if(!err) {
            res.redirect('/admin/administrator');
        }else{
            res.render('admin/error', { error : err});
        }
    });
});
// Authenticate
router.get('/login', function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/admin/administrator');
    }else{
        res.render('admin/login');
    }
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
   var newCategory = new Category;
   newCategory.catename = req.body.catename;
   newCategory.catedes = req.body.catedes;
   newCategory.cateslug = functions.removeAccent(newCategory.catename);
   if(req.files.catecover.name){
    newCategory.catecover = uploadImages(req.files.catecover, cfpath.pathUploadCategory,cfpath.pathImgCategory);
   }
   if(req.files.cateavatar.name){
    newCategory.cateavatar = uploadImages(req.files.cateavatar, cfpath.pathUploadCategory,cfpath.pathImgCategory);
   }
   if(req.files.catebanner1.name){
    newCategory.catebanner1 = uploadImages(req.files.catebanner1, cfpath.pathUploadBanner,cfpath.pathImgBanner);
   }
   if(req.files.catebanner2.name){
    newCategory.catebanner2 = uploadImages(req.files.catebanner2, cfpath.pathUploadBanner,cfpath.pathImgBanner);
   }
   if(req.files.catebanner3.name){
    newCategory.catebanner3 = uploadImages(req.files.catebanner3, cfpath.pathUploadBanner,cfpath.pathImgBanner);
   }
   
   //console.log(req.files.catecover);
   //newCategory.cateavatar = req.file.cateavatar;
   /*newCategory.catebanner1 = req.file.catebanner1;
   newCategory.catebanner2 = req.file.catebanner2;
   newCategory.catebanner3 = req.file.catebanner3;*/
   
   Category.addCategory(newCategory, function(err,newCategory){
        if(!err) {
            res.render('admin/add-categories', {status : 'success', message : 'Thêm ngành hàng thành công!',user : req.user});
            return false;
        }else{
            res.render('admin/add-categories', {status : 'error', message : error,user : req.user});
            return false;
        }
    });
});



// Simple route middleware to ensure user is authenticated.
function isAuthenticated(req,res,next){
   if(req.user)
      return next();
   else
      res.redirect('/admin/login');
}
// Upload images
function uploadImages(file,path = '/usr/src/app/express/public/upload/', pathImg = 'pictures/banner'){
    var originalFilename = file.name;
    var fileType         = file.type.split('/')[1];
    var fileSize         = file.size;
    var pathUpload       = path + originalFilename;
    var pathImg       = pathImg + originalFilename;
    var data = fs.readFileSync(file.path);
    fs.writeFileSync(pathUpload, data);
    var imgUrl = '';
    if( fs.existsSync(pathUpload) ) {
        imgUrl = pathImg;
    }
    return imgUrl;
}
module.exports = router;
