'use strict';

require('babel/register');

try {
  require('assert-env')([
    'POSTGRES_URL',
    'NODE_ENV',
    'NODE_PATH'
  ]);
} catch(err) {
  throw new Error(err.message);
}

var Bookshelf = require('bookshelf');
var config = require('config');
var hapi = require('app/server');
var knex = require('knex');

Bookshelf.PG = Bookshelf.initialize(knex(config.get('/knex/options')));
require('app/controller')(hapi);

if (! module.parent) {
  hapi.start(function() {
    /*eslint-disable no-console */
    console.log(hapi.info);
    /*eslint-enable no-console */
  });
} else {
  module.exports = hapi;
}
