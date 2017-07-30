/**
 * Created by UserPC on 7/16/2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../config/database');

const SubcategorySchema = mongoose.Schema({
    cateid : {type: mongoose.Schema.Types.ObjectId, ref: 'category'},
    subcatename : String,
    subcateslug : {
        type: String,
        required: true,
        unique: true
    },
    subcatedes: {
	    type: String,
	    required: true
	},
    status : {
    	type: Number,
        default: 1
    }
});
const subcategory = module.exports = mongoose.model('subcategory', SubcategorySchema);
module.exports.addSubcategory = function (newSubcategory, callback) {
    newSubcategory.save(callback);
}
module.exports.getSubcategory = function (callback) {
    subcategory.find({}).populate('cateid').exec(function (err, subcategory){
        //console.log(subcategory);
    });
}
module.exports.getPostById = function (id, callback) {
    newSubcategory.findById(id, callback);
}
