'use strict';

var Hapi = require('hapi');
var config = require('./config');
var serverConfig = config.get('/server');

var hapi = new Hapi.Server();
hapi.connection({ port: serverConfig.port, host: serverConfig.host });

hapi.register(require('hapi-auth-cookie'), function() {
  hapi.auth.strategy('session', 'cookie', config.get('/session'));
});

var api = require('iso-fetch');
api.init({ hapi: { server: hapi } });

module.exports = hapi;
