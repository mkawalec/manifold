'use strict';

require('node-jsx').install({
  extension : '.jsx'
});

var react    = require('react');
var Mustache = require('mustache');
var fs       = require('fs');
var fluxApp  = require('./bootstrap');

var indexTemplate = fs.readFileSync(__dirname + '/../../client/index.html').toString();

Mustache.parse(indexTemplate);
console.log('controller reached');

function appHandler(request, reply) {
  console.log('we are inside the handler');
  var route = fluxApp.matchRoute(request.path, {
    method : request.method
  });

  if (! route) {
    console.log('not found!');
    return reply('Not found').code(405);
  }

  var componentClass = route.handler;

  var Component = react.createFactory(componentClass);

  return componentClass.load(route).then(function pageLoaded(stores) {
    var state = {
      stores : stores || {}
    };

    // populate the stores with the data returned from the loader
    fluxApp.rehydrate(state);

    var page = Component(); // jshint ignore:line

    var html = react.renderToString(page);

    var payload = {
      method : request.method,
      state : state
    };

    reply(Mustache.render(indexTemplate, {
      page : html,
      payload : JSON.stringify(payload)
    })).code(200);

  });
}

module.exports = function(hapi) {
  require('./static/controller')(hapi);
  require('../routes')(hapi);

  hapi.route({
    method : '*',
    path : '/{path*}',
    handler : appHandler
  });
};
