'use strict';

module.exports = function(hapi) {
  hapi.route({
    method: 'POST',
    path: '/login',
    config: require('./app/session/login')
  });

  hapi.route({
    method: 'GET',
    path: '/logout',
    config: require('./app/session/logout')
  });

  require('./api/controller')(hapi);
};
