//API routes entry point

'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');
let db = require('../config/db');


//Middleware for the requests
router.use((req, res, next) => {
  console.log('Happening before routes...');
  console.log(__dirname);

  next();
});

router.route('/')

  .get(function(req, res){
    //res.send('API is working!');
    res.sendfile(path.join(__dirname + '/../views/index.html'));
  });


//Exporting the routes
module.exports = router;
