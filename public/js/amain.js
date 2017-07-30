
$('#addsubcate').unbind().click(function(){
	var html = '<div class="form-group"><label for="catename">Tên ngành hàng con:</label><input id="catename" name="subcatename[]" required="" class="form-control" type="text"></div>'; 
	html += '<div class="form-group"><label for="catedes">Mô tả về ngành hàng con:</label>    <textarea id="catedes" row="7" name="subcatedes[]" required="" class="form-control"></textarea></div></br></br>';
	$('.subcate').append(html);
});