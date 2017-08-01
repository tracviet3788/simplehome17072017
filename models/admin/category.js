/**
 * Created by UserPC on 7/16/2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
module.exports.addSubCate = function (cateid, subcateid, callback) {
	if(cateid){
		const query = {_id:cateid};
		category.update(query, {$push: { subcategory: subcateid } }, { multi: false }, callback);
	}else{
		console.log('Invalid cateid');
	}
}
module.exports.updateCateBySlug = function (slug, newcategory, callback) {
	//console.log(administrator);
	if(slug){
		const query = {cateslug:slug};
	    category.update(query, newcategory, { multi: false }, callback);
	}else{
		return 'Invalid slug';
	}
}
module.exports.getAllCategory = function (callback) {
    category.find({}).populate('subcategory').exec(callback);
}
module.exports.getCateBySlug = function (slug, callback) {
	if(slug){
		const query = {cateslug:slug};
		//console.log(query);
		category.findOne(query).populate('subcategory').exec(callback);
	}else{
		res.send('Invalid cateslug');
	}
}
