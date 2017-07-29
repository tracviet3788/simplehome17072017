#[Nodejs] Tạo blog đơn giản với Nodejs, Expressjs, Mongodb

Trong bài viết này tôi sẽ hướng dẫn các bạn xây dựng 1 blog đơn giản bằng Nodejs kết hợp với Mongodb

#### Trong bài có sử dụng

> Nodejs v0.10.32

> Expresjs v4.9.5

> Mongodb v2.4.9

> Mongoose v3.8.17

> Jade v1.7.0

#### Đối tượng áp dụng

- Hiểu sơ qua về Nodejs, biết sử dụng expressjs
- Đã từng sử dụng Mongodb
- Đã từng sử dụng Jade

#### Cấu trúc file và folder

	express
		libs
			functions.js
		node_modules
		public
			css
			fonts
			ico
			img
			js
			upload
		views
			includes
			layouts
			404.jade
			index.jade
		package.json
		server.js

#### Package.json

`package.json` là 1 file cấu hình dùng để khai báo thông tin về ứng dụng của chúng ta như: version, tác giả, điều khoản sử dụng, các node_modules sử dụng trong ứng dụng.

Nếu sử dụng Laravel PHP Framework chắc bạn sẽ thấy sự tương đồng giữa `package.json` và `composer.json`.

	{
	  "name": "a-blog",
	  "description": "A Blog",
	  "version": "0.0.1",
	  "private": true,
	  "dependencies": {
	    	"express": "latest",
	    	"mongoose" : "latest",
	    	"jade" : "latest",
	   	"body-parser" : "latest",
	   	"connect-multiparty" : "latest"
	  	}
	}

Chạy lệnh sau để cài đặt:

	npm install

Nếu máy bạn sử dụng WindowOS thì hãy download bộ cài Nodejs về cài đặt vì bộ cài này đã bao gồm cả npm. [http://nodejs.org/download/](http://nodejs.org/download/)

Ubuntu hãy chạy lệnh sau để cài đặt npm:

	sudo apt-get install npm

#### Master template

Chúng ta sẽ sử dụng jade làm template để xây dựng lên giao diện blog. Jade có cơ chế extends template rất linh hoạt, nếu ai đã từng sử dụng Laravel( PHP framework ) thì chắc chắn sẽ thích điều này.

Khi sử dụng jade chúng ta không cần quan tâm tới thẻ đóng html nữa, cú pháp cực kỳ gọn nhẹ , dễ đọc và dễ hiểu.

Khi template con extends 1 template cha thì mặc định nó sẽ có hết nội dung từ template cha.

Để cho dễ hiểu hãy xem file master.jade mà tôi tạo ra như sau:

	doctype html
	html
		head
			title My first Blog :: #{title}

			block styles
				link(href="/themes/css/bootstrap.min.css" rel="stylesheet")
				link(href="/themes/css/font-awesome.min.css" rel="stylesheet")
				link(href="/themes/css/style.css" rel="stylesheet")

		body
			div#wrapper

				include ../includes/header.jade

				div(class="container")
					block contents
				include ../includes/footer.jade

				block scripts
					script(src="/themes/js/jquery.1.10.2.min.js")
					script(src="/themes/js/bootstrap.min.js")
					script(src="/themes/js/tinymce4x/tinymce.min.js")
					script(src="/themes/js/main.js")


Tôi có định nghĩa ra 3 khối đó là `block styles` , `block scripts` và `block contents`.

`block styles` là nơi để template con có thể thêm những style riêng của mình vào ngoài những style mà template cha quy định.

`block scripts` là nơi để template con có thể thêm những đoạn script riêng của mình vào ngoài những script mà template cha quy định.

`block contents` đây là nơi chứa nội dung mà template con định nghĩa ra.

Dùng `include` để chèn nội dung của file template khác vào 1 file. ( Liên tưởng tới include trong PHP ).

Jade còn nhiều những đặc điểm và cú pháp khác nữa nhưng trong bài này tôi chỉ có thể giới thiệu qua một chút về những điểm nổi bật.
Nếu bạn còn thắc mắc vui lòng vào [http://jade-lang.com](http://jade-lang.com/) để tìm hiểu thêm nhé.

Cái tôi muốn trình bày trong bài này là tập trung trả lời những câu hỏi sau:

-	Làm sao để xây dựng 1 trang web động sử dụng nodejs
-	Kết hợp nodejs và mongodb như thế nào
- 	Export module trong nodejs

Sau khi trả lời được những câu hỏi trên các bạn sẽ hình dung đưọc việc viết 1 trang web động bằng js và php nó giống nhau và khác nhau như thế nào, từ đó sẽ có những trải nghiệm thú vị khi xây dựng web với chỉ bằng một ngôn ngữ.

#### Export module

Để sử dụng các module trong nodejs bạn chỉ cần dùng `require` để load các module đó.

	require(module);

Trong quá trình làm việc tất nhiên bạn sẽ xây dựng những hàm , class tiện tích để sử dụng theo ý thích của mình.
Để sử dụng đưọc những thứ đó trong nodejs thì bạn cần phải viết theo dạng module và dùng `require` để load những thư viện
của mình vào ứng dụng.


Một ví dụ đơn giản về cách viết như sau

	// File hello.js
	exports.hello = function(name) {
		return 'Hello ' + name;
	}

	var a = require('hello.js');
	console.log(a.hello('Justin')); // return Hello Justin


#### Bắt đầu code nào

Mở file server.js ra và chúng ta bắt đầu thôi.

**Load các module cần thiết**

Việc đầu tiên và rất quan trọng đó là load các module bạn muốn sử dụng.

File để chạy ứng dụng của chúng ta là `server.js` bạn có thể bất kỳ 1 tên nào khác cũng được(app.js, myapp.js, ...).

	var functions = require('./libs/functions.js');

	var fs                  = require('fs');
	var express             = require('express');
	var jade                = require('jade');
	var bodyParser          = require('body-parser');
	var multipart           = require('connect-multiparty');
	var multipartMiddleware = multipart();
	var mongoose            = require('mongoose');

**Cấu hình app**

	// Khởi tạo app với express
	var app = express();

	// Đường dẫn tới thư mục pulic
	app.use('/themes/', express.static(__dirname + '/public/'));

	// Đường dẫn tới thư mục upload
	app.use('/pictures/', express.static(__dirname + '/public/upload/'));

	// Đường dẫn tới thư mục views
	app.set('views', __dirname + '/views/');

	// Sử dụng template engine là jade
	app.set('view engine', 'jade');
	app.engine('jade', require('jade').__express);

	// Sử dụng bodyParser để upload ảnh và pasrse request POST
	app.use(bodyParser.urlencoded({
	  	extended: true
	}));

**Cấu hình kết nối Mongodb**

	// Kết nối tới mongo
	mongoose.connect('mongodb://localhost/test');

	// Khởi tạo đối tượng connection để test kết nối
	var dbMongo = mongoose.connection;

	// Handle sự kết open và error khi kết nối mongo
	dbMongo.on('error', console.error.bind(console, 'connection error:'));

	dbMongo.once('open', function(){
		console.log('MongoDb connected');
	});

	// PostSchema
	var PostSchema = mongoose.Schema({
		title : String,
		slug : String,
		picture : String,
		teaser : String,
		content : String,
		author: String,
		time : Number
	});

	//Model Post với PostSchema tương ứng
	var Post = mongoose.model('Post', PostSchema);

**Router**

> **Trang chủ**

	// Request tới trang chủ
	app.get('/', function(req, res){

		// Lấy tất cả danh sách bài viết
		// Đổ dữ liệu và template index và output ra html
		var posts = Post.find({}, function(err, result) {

			// Sắp xếp bài viết mới nhất lên đầu
			result = result.sort({'id' : -1});

			res.render('index', { title : 'Home page' , posts : result, functions : functions});
		});

	});

Trang chủ của 1 blog thường sẽ show ra những bài viết mới nhất để người dùng tiện theo dõi. Sau khi lấy hết danh sách bài viết tôi sẽ đổ dữ liệu và file template là index.

Đây là nội dung file `index.jade`

	extends ./layouts/master.jade

	block contents

		div(class="row")
			- each post in posts
				div(class="post-item col-sm-4")
					a(href="#{ functions.urlPost(post) }")
						h5(class="col-sm-12") #{post.title}
						div.picture-crop
							img(src="/pictures/#{post.picture}" class="col-sm-12 picture")


Đầu tiên đó là kế thừa nội dung html từ master template `master.jade`.

Tiếp đó là đổ dữ liệu vào block contents đã khai báo trong master

Sử dụng cú pháp lặp `each` của jade để lặp qua từng bài viết một.

> **Trang chi tiết**

	// Request trang chi tiết
	// Request có dạng : /post/tieu-de-bai-viet/id-bai-viet.html
	app.get('/post/:title/:id.html', function(req, res) {

		// Get id param
		var id = req.params.id || 0;

		// Tìm bài viết tưong ứng với ID
		Post.findById(id, function(err, post) {

			// Trả về HTML chi tiết tưong ứng với bài viết
			if(post) {
				res.render('post/detail', {title : post.title, post : post});
				return false;
			}

			// Không tìm thấy thì hiện trang 404
			res.render('404');
		});

	});

> **Trang tạo bài viết**

	// Form tạo bài viết
	app.get('/create-post', function(req, res) {
		res.render('post/create', { title : 'Create a post' });
	});


	// Xử lý đăng bài viết
	app.post('/create-post', multipartMiddleware, function(req, res) {

		// Khởi tạo đối tượng post
		var post = new Post;
		post.title = req.body.title;
		post.slug = functions.removeAccent(req.body.title);
		post.teaser = req.body.teaser;
		post.content = req.body.content;

		// Upload ảnh
		var file = req.files.picture;

		var originalFilename = file.name;
		var fileType         = file.type.split('/')[1];
		var fileSize         = file.size;
		var pathUpload       = __dirname + '/public/upload/' + originalFilename;

		var data = fs.readFileSync(file.path);
		fs.writeFileSync(pathUpload, data);

		if( fs.existsSync(pathUpload) ) {
			post.picture = originalFilename;
		}

		// Lưu bài viết vào Mongo và trả về thông tin đăng thành công hay chưa?
		post.save(function(err, obj) {
			if(!err) {
				res.render('post/create', { status : 'success', message : 'Post successful!' });
				return false;
			}
		});
	});


####Chạy ứng dụng.

Bật giao diện cửa sổ dùng lệnh của bạn lên và chạy lệnh sau:

	node server.js

Chú ý: Bạn phải cd vào thư mục chứa code trên máy của bạn trước rồi hãy chạy lệnh trên.

####Tổng quan

Đây là 1 bài ở mức cơ bản nhất để bạn hiểu đưọc cách viết web động bằng nodejs như thế nào. Sau khi theo dõi bài này tôi hy vọng bạn sẽ xây dựng đưọc
thật nhiều những ứng dụng web cho riêng mình. Chúc bạn có những phút giây thư giãn tại [http://hanoijs.org](http://hanoijs.org).


> Các bạn copy bài từ hanoijs.org vui lòng ghi rõ nguồn và tác giả. Cảm ơn các bạn đã ủng hộ suốt thời gian qua.

#### Các bài viết về Nodejs

- [Nhập môn Nodejs](http://hanoijs.org/bai-viet/node-js/nhap-mon-nodejs/1)
- [Nhập môn Nodejs - Events](http://hanoijs.org/bai-viet/node-js/nhap-mon-nodejs-events/2)
- [Tổ chức và sử dụng lại code trong nodejs](http://hanoijs.org/bai-viet/node-js/to-chuc-va-su-dung-lai-code-trong-nodejs/6)
- [Nodejs - Ứng dụng Todo với Backbonejs, Expressjs, MongoDb](http://hanoijs.org/bai-viet/node-js/nodejs-ung-dung-todo-voi-backbonejs-expressjs-mongodb/36)
- [Streams trong nodejs](http://hanoijs.org/bai-viet/node-js/streams-trong-nodejs/3)
- [Nodejs - Upload file](http://hanoijs.org/bai-viet/node-js/nodejs-upload-file/43)