const Administrator = require('../../models/admin/administrator');
var cfpath = require('../../config/default.js');
var functions = require('../../libs/functions.js');
exports.addAdministrator = function(req,res) {
	var newAdministrator = new Administrator;
    newAdministrator.fullname = req.body.fullname;
    newAdministrator.username = req.body.username;
    newAdministrator.udescriptions = req.body.udescriptions;
    newAdministrator.password = req.body.password;
    newAdministrator.email = req.body.email;
    newAdministrator.address = req.body.address;
    Administrator.addAdministrator(newAdministrator, function(err,administrator){
        if(!err) {
            res.render('admin/administrator', {status : 'success', message : 'Thêm Administrator thành công!',user : req.user});
        }else{
            res.render('admin/error', {status : 'error', message : err,user : req.user});
        }
    });
}
exports.updateProfile = function(req,res) {
	var newAdministrator = {};
    newAdministrator.fullname = req.body.fullname;
    newAdministrator.udescriptions = req.body.udescriptions;
    newAdministrator.email = req.body.email;
    newAdministrator.address = req.body.address;
    Administrator.updateUserByUsername(req.body.usernamehd, newAdministrator, function(err,administrator){
        if(!err) {
            res.render('admin/profile', {status : 'success', message : 'Cập nhật Administrator thành công!',user : req.user});
        }else{
            res.render('admin/profile', {status : 'error', message : error,user : req.user});
        }
    });
}
exports.getProfile = function(req,res) {
	if(req.user.username){
        Administrator.getUserByUsername(req.user.username, (err, administrator) => {
            if(!err) {
                res.render('admin/profile', { user : administrator});
            }else{
                res.render('admin/error', { error : err});
            }
        });
    }
}

exports.getPassProfile = function(req,res) {
	if(req.user.username){
        Administrator.getUserByUsername(req.user.username, (err, administrator) => {
            if(!err) {
                res.render('admin/profile-cpass', { user : administrator});
            }else{
                res.render('admin/error', { error : err});
            }
        });
    }
}
exports.changePassProfile = function(req,res) {
	if(req.body.npassword != req.body.cnpassword){
        res.render('admin/profile-cpass', {status : 'error', message : "Mật khẩu bạn nhập không khớp",user : req.user});
    }else{
        var newAdministrator = new Administrator;
        newAdministrator.password = req.body.npassword;
        Administrator.comparePassword( req.body.opassword, req.user.password, (err, isMatch) => {
              if(err) throw err;
              if(isMatch){
                Administrator.updatePasswordUser(req.body.usernamehd, newAdministrator, function(err,administrator){
                    if(!err) {
                        res.render('admin/profile-cpass', {status : 'success', message : 'Cập nhật mật khẩu Administrator thành công!',user : req.user});
                    }else{
                        res.render('admin/error', { error : err});
                    }
                });
              } else {
                res.render('admin/profile-cpass', {status : 'error', message : "Mật khẩu cũ bạn nhập không khớp",user : req.user});
              }
        });
        
    }
}