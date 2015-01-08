'use strict';

var Confidence = require('confidence');

var env  = process.env.NODE_ENV || 'development';

var store = new Confidence.Store({
  name : 'Manifold (Server)',
  server : {
    host : process.env.HOST || '0.0.0.0',
    port : process.env.PORT || 55555,
    env  : env
  },
  knex   : require('./knex'),
});

exports.get = function(key) {
  return store.get(key, { env : env });
};

exports.meta = function(key) {
  return store.meta(key, { env : env });
};
