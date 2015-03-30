'use strict';

require('babel/register');

try {
  require('assert-env')([
    'POSTGRES_URL',
    'NODE_ENV',
    'NODE_PATH'
  ]);
} catch(err) {
  /*eslint-diable no-console */
  console.error(err.message);
  /*eslint-enable no-console */

  process.exit(1);
}

var Bookshelf = require('bookshelf');
var config = require('config');
var hapi = require('app/server');
var knex = require('knex');

Bookshelf.PG = Bookshelf.initialize(knex(config.get('/knex/options')));
require('app/controller')(hapi);

if (! module.parent) {
  hapi.start(function() {
    console.log(hapi.info);
  });
} else {
  module.exports = hapi;
}
