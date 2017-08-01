const Category = require('../../models/admin/category');
const subCategory = require('../../models/admin/subcategory');
var cfpath = require('../../config/default.js');
var functions = require('../../libs/functions.js');
var fs                  = require('fs');
exports.addCategory = function(req,res) {
	var newCategory = new Category;
   newCategory.catename = req.body.catename;
   newCategory.catedes = req.body.catedes;
   newCategory.status = req.body.catestatus;
   newCategory.cateslug = functions.removeAccent(newCategory.catename);
   if(req.files.catecover.name){
    newCategory.catecover = uploadImages(req.files.catecover, cfpath.pathUploadCategory,cfpath.pathImgCategory);
   }
   if(req.files.cateavatar.name){
    newCategory.cateavatar = uploadImages(req.files.cateavatar, cfpath.pathUploadCategory,cfpath.pathImgCategory);
   }
   if(req.files.catebanner1.name){
    newCategory.catebanner1 = uploadImages(req.files.catebanner1, cfpath.pathUploadBanner,cfpath.pathImgBanner);
   }
   if(req.files.catebanner2.name){
    newCategory.catebanner2 = uploadImages(req.files.catebanner2, cfpath.pathUploadBanner,cfpath.pathImgBanner);
   }
   if(req.files.catebanner3.name){
    newCategory.catebanner3 = uploadImages(req.files.catebanner3, cfpath.pathUploadBanner,cfpath.pathImgBanner);
   }
   Category.addCategory(newCategory, function(err,newCategory){
        if(!err) {
          var subcatename = req.body.subcatename;
          var subcatedes = req.body.subcatedes;
          if(typeof subcatename !== 'undefined'){
          	for(var i =0; i < subcatename.length ; i++){
	            var newsubCategory = new subCategory;
	            if(subcatename[i]!=''){
	              newsubCategory.subcatename = subcatename[i];
	              newsubCategory.subcateslug = functions.removeAccent(newsubCategory.subcatename);
	            }
	            if(subcatedes[i]!=''){
	              newsubCategory.subcatedes = subcatedes[i];
	            }
	            newsubCategory.cateid = newCategory._id;
	            subCategory.addSubcategory(newsubCategory, function(err,newsubCategory){
	              if(!err) {
	                Category.addSubCate(newCategory._id,newsubCategory._id,function(err,category){
	                    if(!err) {
	                        res.render('admin/add-categories', {status : 'success', message : 'Thêm ngành hàng thành công!',user : req.user});
	                    
	                    }else{
	                        res.render('admin/add-categories', {status : 'error', message : error,user : req.user});
	                        
	                    }
	                });
	              }else{
	                  res.render('admin/add-categories', {status : 'error', message : error,user : req.user});
	                  
	              }
	            });
          	}
          }else{
          	res.render('admin/add-categories', {status : 'success', message : 'Thêm ngành hàng thành công!',user : req.user});
          }
          
        }else{
            res.render('admin/add-categories', {status : 'error', message : error,user : req.user});
            
        }
    });
}
//Update Category
exports.updateCategory = function(req,res) {
	var title = req.params.title || 0;
	if(title != 0 && req.body.cateid){
		var newCategory = {};
		newCategory._id = req.body.cateid;
		newCategory.catename = req.body.catename;
		newCategory.catedes = req.body.catedes;
		newCategory.status = req.body.catestatus;
		newCategory.cateslug = functions.removeAccent(newCategory.catename);
		if(req.files.catecover.name){
			newCategory.catecover = uploadImages(req.files.catecover, cfpath.pathUploadCategory,cfpath.pathImgCategory);
		}
		if(req.files.cateavatar.name){
			newCategory.cateavatar = uploadImages(req.files.cateavatar, cfpath.pathUploadCategory,cfpath.pathImgCategory);
		}
		if(req.files.catebanner1.name){
			newCategory.catebanner1 = uploadImages(req.files.catebanner1, cfpath.pathUploadBanner,cfpath.pathImgBanner);
		}
		if(req.files.catebanner2.name){
			newCategory.catebanner2 = uploadImages(req.files.catebanner2, cfpath.pathUploadBanner,cfpath.pathImgBanner);
		}
		if(req.files.catebanner3.name){
			newCategory.catebanner3 = uploadImages(req.files.catebanner3, cfpath.pathUploadBanner,cfpath.pathImgBanner);
		}
		Category.updateCateBySlug(title,newCategory, function(err,updateCategory){
			console.log(newCategory);
	        if(!err) {
	          var subcatename = req.body.subcatename;
	          var subcatedes = req.body.subcatedes;
	          if(typeof subcatename !== 'undefined'){
	          	for(var i =0; i < subcatename.length ; i++){
		            var newsubCategory = new subCategory;
		            if(subcatename[i]!=''){
		              newsubCategory.subcatename = subcatename[i];
		              newsubCategory.subcateslug = functions.removeAccent(newsubCategory.subcatename);
		            }
		            if(subcatedes[i]!=''){
		              newsubCategory.subcatedes = subcatedes[i];
		            }
		            newsubCategory.cateid = newCategory._id;
		            subCategory.addSubcategory(newsubCategory, function(err,newsubCategory){
		              if(!err) {
		                Category.addSubCate(newCategory._id,newsubCategory._id,function(err,category){
		                    if(err) {
		                        res.render('admin/error', { error : err,user : req.user}); 
		                    }
		                });
		              }else{
		                  res.render('admin/error', { error : err,user : req.user});
		                  
		              }
		            });
	          	}
	          }
	          res.redirect('/admin/edit-cate/'+ newCategory.cateslug); 
	        }else{
	            res.render('admin/error', { error : err,user : req.user});
	            
	        }
	    });
	}else{
		res.send('Title không hợp lệ');
	}
	
}
// Update Sub Category
exports.updateSubCategory = function(req,res) {
	var title = req.params.title || 0;
	if(title != 0 && req.body.subcateid){
		var newSubCategory = {};
		if(req.body.subcatename){
			newSubCategory.subcatename = req.body.subcatename;
			newSubCategory.subcateslug = functions.removeAccent(newSubCategory.subcatename);
		}
		if(req.body.subcatedes){
			newSubCategory.subcatedes = req.body.subcatedes;
		}
		if(req.body.subcatestatus){
			newSubCategory.status = req.body.subcatestatus;
		}
		subCategory.updateSubCateBySlug(title,newSubCategory, function(err,updateCategory){
	        if(!err) {
	        	res.redirect('/admin/mag-categories/');
	          
	        }else{
	            res.render('admin/error', { error : err,user : req.user}); 
	        }
	    });
	}else{
		res.send('Title không hợp lệ');
	}
	
}
// Upload images
function uploadImages(file,path = '/usr/src/app/express/public/upload/', pathImg = 'pictures/banner'){
    var originalFilename = file.name;
    var fileType         = file.type.split('/')[1];
    var fileSize         = file.size;
    var pathUpload       = path + originalFilename;
    var pathImg       = pathImg + originalFilename;
    var data = fs.readFileSync(file.path);
    fs.writeFileSync(pathUpload, data);
    var imgUrl = '';
    if( fs.existsSync(pathUpload) ) {
        imgUrl = pathImg;
    }
    return imgUrl;
}
exports.getAdminCategory = function(req,res) {
	Category.getAllCategory(function (err, category){
      if(!err){
        res.render('admin/mag-categories', {category:category,user : req.user});
      }else{
        res.send(err);
      }
    });
}
exports.getEditAdminCategory = function(req,res) {
	var title = req.params.title || 0;
	Category.getCateBySlug(title,function (err, category){
      if(!err){
      	if(category){
      		res.render('admin/edit-categories', {category:category,user : req.user});
      	}else{
      		res.render('admin/error', { error : "Không có danh mục này!",user : req.user});
      	}
        
      }else{
        res.send(err);
      }
    });
}
exports.getEditAdminSubCategory = function(req,res) {
	var title = req.params.title || 0;
	subCategory.getSubCateBySlug(title,function (err, subcategory){
      if(!err){
      	if(subcategory){
      		res.render('admin/edit-subcategories', {subcategory:subcategory,user : req.user});
      	}else{
      		res.render('admin/error', { error : "Không có danh mục này!",user : req.user});
      	}
        
      }else{
        res.send(err);
      }
    });
}