const General = require('../../models/admin/general');
exports.addGeneral = function(req,res) {
	var newAdministrator = new Administrator;
    newAdministrator.fullname = req.body.fullname;
    newAdministrator.username = req.body.username;
    newAdministrator.udescriptions = req.body.udescriptions;
    newAdministrator.password = req.body.password;
    newAdministrator.email = req.body.email;
    newAdministrator.address = req.body.address;
    Administrator.addAdministrator(newAdministrator, function(err,administrator){
        if(!err) {
            res.redirect('/admin/administrator');
        }else{
            res.render('admin/error', { error : err});
        }
    });
}
