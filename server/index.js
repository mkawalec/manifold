'use strict';

var Bookshelf = require('bookshelf');
var config = require('./config');
var hapi = require('./server');
var knex = require('knex');

Bookshelf.PG = Bookshelf.initialize(knex(config.get('/knex/options')));
require('./app/controller')(hapi);

if (! module.parent) {
  hapi.start(function() {
    console.log(hapi.info);
  });
} else {
  module.exports = hapi;
}
