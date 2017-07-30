/**
 * Created by UserPC on 7/16/2017.
 */
const express = require('express');
const router = express.Router();
var multipart           = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs                  = require('fs');
var functions = require('../libs/functions.js');
var cfpath = require('../config/default.js');
const Post = require('../models/home/post');
const Category = require('../models/admin/category');
router.get('/', function(req,res){
    Category.getAllCategory(function (err, category){
      if(!err){
        console.log(category);
        res.render('index', { title : 'Home page' , categories : category, functions : functions});
      }else{
        res.send(err);
      }
    });
    
});
router.get('/create-post', function(req, res) {
    res.render('post/create', { title : 'Create a post' });
});
router.post('/create-post', multipartMiddleware, function(req, res) {

    var newPost = new Post;
    newPost.title = req.body.title;
    newPost.slug = functions.removeAccent(req.body.title);
    newPost.teaser = req.body.teaser;
    newPost.content = req.body.content;
    var file = req.files.picture;

    var originalFilename = file.name;
    var fileType         = file.type.split('/')[1];
    var fileSize         = file.size;
    var pathUpload       = '/usr/src/app/express/public/upload/' + originalFilename;

    var data = fs.readFileSync(file.path);
    fs.writeFileSync(pathUpload, data);

    if( fs.existsSync(pathUpload) ) {
        newPost.picture = originalFilename;
    }
    Post.addPost(newPost, function(err,newPost){
        if(!err) {
            res.render('post/create', { status : 'success', message : 'Post successful!' });
            return false;
        }
    });
});
router.get('/post/:title/:id.html', function(req, res) {

    var id = req.params.id || 0;

    Post.getPostById(id, function(err,post) {

        if(post) {
            res.render('post/detail', {title : post.title, post : post});
            return false;
        }

        res.render('404');
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
