/**
 * Created by UserPC on 7/16/2017.
 */
const mongoose = require('mongoose');
const config = require('../../config/database');

const SubcategorySchema = mongoose.Schema({
    subcatename : String,
    subcateslug : String,
    subcatedes: {
	    type: String,
	    required: true
	},
    status : {
    	type: Number
    }
});
const subcategory = module.exports = mongoose.model('subcategory', SubcategorySchema);
module.exports.addSubcategory = function (newSubcategory, callback) {
    newSubcategory.save(callback);
}
module.exports.getSubcategory = function (callback) {
    newSubcategory.find({}).exec(callback);
}
module.exports.getPostById = function (id, callback) {
    newSubcategory.findById(id, callback);
}
