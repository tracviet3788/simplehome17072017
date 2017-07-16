/**
 * Created by UserPC on 7/15/2017.
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


const app = express();
const users = require('./routes/users');
//Connected to database
mongoose.connect(config.databases);

//On connection
mongoose.connection.on('connected', function(){
    console.log("Connected to database "+ config.databases);
})
mongoose.connection.on('error', function(err){
    console.log("Not connected to database "+ config.databases +" " +err);
})

// Port Number
const port = 3000;
// Cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
//
app.use('/users',users);
app.get('/', function(req,res) {
    res.send('Invalid Endpoint!');
});

app.listen(port,function(){
    console.log("Server started on port "+port);
})
