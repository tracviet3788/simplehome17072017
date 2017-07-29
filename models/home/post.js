/**
 * Created by UserPC on 7/16/2017.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');


const PostSchema = mongoose.Schema({
    title : String,
    slug : String,
    picture : String,
    teaser : String,
    content : String,
    author: String,
    time : Number
});
const Post = module.exports = mongoose.model('posts', PostSchema);
module.exports.addPost = function (newPost, callback) {
    newPost.save(callback);
}
module.exports.getAllPosts = function (callback) {
    Post.find({}).exec(callback);
}
module.exports.getPostById = function (id, callback) {
    Post.findById(id, callback);
}

