'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');
let db = require('../config/db');

router.use((req, res, next) => {
  console.log('Happening before actor routes...');

  next();
});

//For the routes at /movies
router.route('/')
    //create a movie
  //.post(ctrlMovies.create)
    //get all the movies
  //.get(ctrlMovies.getAll);
  .get(function(req, res, next){

    let query = [
        'MATCH (a:Person)-[:ACTED_IN]->()',
        'RETURN a'
    ].join('\n');

    db.cypher({
      query: query,
      params: ''
    }, function(err, actors){
      if(err) console.log(err);
      res.send(actors);
      //console.log(res);
    });

  })

  .post(function(req, res, next){

    let query = [
        'CREATE (a:Person {actor})',
        'RETURN a'
    ].join('\n');

    let params = {
    	actor:{
	    	name: req.body.name,
	    	born: req.body.born
    	}
    }



    db.cypher({
      query: query,
      params: params
    }, function(err, actors){
      if(err) console.log(err);
      res.send(actors);
      //console.log(res);
    	console.log(req.body);
    });

  })

  .put(function(req, res, next){
  	let id = Number(req.body.id);
    let query = [
        //'MATCH (n:Person {name: \'{actor.name}\'})',
        'MATCH (n:Person)',
        'WHERE ID(n) = {id}',
        'SET n = {actor}',
        'RETURN n'
    ].join('\n');

    let params = {

    	id: id,
    	actor:{
	    	name: req.body.name,
	    	born: req.body.born
    	}
    }

    db.cypher({
      query: query,
      params: params
    }, function(err, actors){
      if(err) console.log(err);
      res.send(actors);
      //console.log(res);
    	//console.log(req.body);

    });
})

  .delete(function(req, res, next){

  	let id = Number(req.body.id);
    let query = [
        'MATCH (a)',
        'WHERE ID(a) = {id}',
        'DETACH DELETE a'
    ].join('\n');

    let params = {
	    	id: id
	    }

    db.cypher({
      query: query,
      params: params
    }, function(err, actors){
      if(err) console.log(err);
      //res.send(actors);
      //console.log(res);
      //console.log(req.body);
    });

  });

  module.exports = router;