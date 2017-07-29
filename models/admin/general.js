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
    address : String
});
const General = module.exports = mongoose.model('general', GeneralSchema);
module.exports.addGeneral = function (newGeneral, callback) {
    newGeneral.save(callback);
}
module.exports.viet = function (callback) {
    console.log("Viet");
}
