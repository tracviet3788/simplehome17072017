/**
 * Created by UserPC on 7/16/2017.
 */
const mongoose = require('mongoose');
const config = require('../../config/database');


const GeneralSchema = mongoose.Schema({
    website : String,
    company : String,
    descriptions : String,
    hotline : Number,
    email : String,
    address : String,
    key: {
	    type: String,
	    unique: true,
	    default: 'main-gen'
	}
});
const General = module.exports = mongoose.model('general', GeneralSchema);
module.exports.addGeneral = function (newGeneral, callback) {
    newGeneral.save(callback);
}
module.exports.getGeneral = function (callback) {
    General.findOne({'key':'main-gen'}).exec(callback);
}