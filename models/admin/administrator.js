/**
 * Created by UserPC on 7/16/2017.
 */
const mongoose = require('mongoose');
const config = require('../../config/database');
const bcrypt = require('bcryptjs');

const AdministratorSchema = mongoose.Schema({
    fullname : String,
    username: {
	    type: String,
	    required: true,
	    unique: true
	},
    password: {
	    type: String,
	    required: true
  	},
    udescriptions : {
	    type: String,
	    lowercase: true,
        trim: true
	},
    email: {
	    type: String,
	    required: true,
	    lowercase: true,
        trim: true,
        unique: true
	},
    address : String
});
const Administrator = module.exports = mongoose.model('administrator', AdministratorSchema);
module.exports.addAdministrator = function (newAdministrator, callback) {
	bcrypt.hash(newAdministrator.password, 10, function(err, hash) {
        if(err) throw err;
        newAdministrator.password = hash;
        newAdministrator.save(callback);
    });
}
module.exports.updatePasswordUser = function (username, administrator, callback) {
	if(username){
		const query = {username:username};
		bcrypt.hash(administrator.password, 10, function(err, hash) {
	        if(err) throw err;
	        Administrator.update(query, {password:hash}, { multi: false }, callback);
	    });
	}else{
		console.log('Invalid username');
	}
}
module.exports.getUserById = function (id, callback) {
    Administrator.findById(id, callback);
}
module.exports.getUserByUsername = function (username, callback) {
    const query = {username:username}
    Administrator.findOne(query, callback);
}
module.exports.updateUserByUsername = function (username, administrator, callback) {
	console.log(administrator);
	if(username){
		const query = {username:username};
		delete administrator._id;
		delete administrator.id;
	    Administrator.update(query, administrator, { multi: false }, callback);
	}else{
		console.log('Invalid username');
	}
    
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}