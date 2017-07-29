/**
 * Created by UserPC on 7/16/2017.
 */
const mongoose = require('mongoose');
const config = require('../../config/database');

const CategorySchema = mongoose.Schema({
    catename : String,
    cateslug : String,
    catedes: {
	    type: String,
	    required: true
	},
    catecover: {
	    type: String,
	    required: true
  	},
    cateavatar : {
	    type: String
	},
    catebanner1: {
	    type: String
	},
	catebanner2: {
	    type: String
	},
	catebanner3: {
	    type: String
	},
  	subcategory : [{ type: Schema.Types.ObjectId, ref: 'subcategory' }],
    status : {
    	type: Number,
    	default: 1
    }
});
const category = module.exports = mongoose.model('category', CategorySchema);
module.exports.addCategory = function (newCategory, callback) {
    newCategory.save(callback);
}
module.exports.getAllPosts = function (callback) {
    category.find({}).exec(callback);
}
module.exports.getPostById = function (id, callback) {
    category.findById(id, callback);
}
