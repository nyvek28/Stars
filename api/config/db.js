'use strict';

let neo4j = require('neo4j');
let neo4jDB = new neo4j.GraphDatabase('http://neo4j:root@localhost:7474');

module.exports = neo4jDB;