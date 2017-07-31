const General = require('../../models/admin/general');
exports.addGeneral = function(req,res) {
	var newGeneral = {};
    newGeneral.website = req.body.website;
    newGeneral.company = req.body.company;
    newGeneral.descriptions = req.body.descriptions;
    newGeneral.hotline = req.body.hotline;
    newGeneral.email = req.body.email;
    newGeneral.address = req.body.address;
    General.update({key:'main-gen'},newGeneral,{upsert: true}, function(err,general){
        if(!err) {
             res.render('admin/general',{status : 'success', message : 'Cập nhật thông tin thành công!',general:newGeneral,user : req.user});
        }else{
            res.render('admin/general',{status : 'error', message : err,general:newGeneral,user : req.user});
        }
    });
}
exports.getGeneral = function(req,res) {
	var newGeneral = new General;
    General.getGeneral(function(err,general){
        if(!err) {
            res.render('admin/general',{general:general,user : req.user});
        }else{
            res.render('admin/error', {status : 'error', message : error,user : req.user});
        }
    });
}
