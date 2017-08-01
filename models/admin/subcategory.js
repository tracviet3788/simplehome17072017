/**
 * Created by UserPC on 7/16/2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../config/database');

const SubcategorySchema = mongoose.Schema({
    cateid : {type: mongoose.Schema.Types.ObjectId, ref: 'category'},
    subcatename : {
        type: String,
        required: true
    },
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
module.exports.getSubCateBySlug = function (slug, callback) {
    if(slug){
        const query = {subcateslug:slug};
        subcategory.findOne(query).exec(callback);
    }else{
        res.send('Invalid subcateslug');
    }
}
module.exports.updateSubCateBySlug = function (slug, newsubcategory, callback) {
    console.log(newsubcategory);
    if(slug){
        const query = {subcateslug:slug};
        subcategory.update(query, newsubcategory, { multi: false }, callback);
    }else{
        return 'Invalid slug';
    }
}
