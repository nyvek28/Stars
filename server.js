//server.js (Express 4.0)

'use strict';

//SETUP
//============================

//Initializing required packages
let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let port = process.env.PORT || 8080;

//Require the db config file
require('./api/config/db');

//Require the routes
let route = require('./api/routes/index');
let actors = require('./api/routes/actors');

//Defining middleware app
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

//Log every request timestamp into console
app.use(function(req, res, next){
  console.log('Time of request: ', Date.now());
  next();
});



//Register the routes in the app
app.use('/', route);
app.use('/actors', actors);
// app.get('/', function(req, res){
// 	//res.sendFile(path.join(__dirname + '/index.html'));
// 	////res.sendFile(express.static(__dirname + '/index.html'));
// });


//Listen to port and run server
app.listen(port);
console.log(__dirname);
console.log('Happiness begins at port ' + port);
