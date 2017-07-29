// Require functions
var functions = require('./libs/functions.js');

var fs                  = require('fs');
var express             = require('express');
var jade                = require('jade');
const bodyParser          = require('body-parser');
var multipart           = require('connect-multiparty');
var mongoose            = require('mongoose');
var multipartMiddleware = multipart();

//Config router
const config = require('./config/database');
const home = require('./routes/home');
const admin = require('./routes/admin');
// Connect Mongo
mongoose.connect(config.databases);
var dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console, 'connection error:'));

dbMongo.once('open', function(){
	console.log('MongoDb connected');
});

// Config app
var app = express();
app.use('/themes/', express.static(__dirname + '/public/'));
app.use('/pictures/', express.static(__dirname + '/public/upload/'));
app.set('views', __dirname + '/views/');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use('/',home);
app.use('/admin',admin);


var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});