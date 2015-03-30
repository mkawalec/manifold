'use strict';

module.exports = function(hapi) {

  hapi.route({
    method: 'GET',
    path: '/api/users/',
    config: require('./actions/fetch-all')
  });

  hapi.route({
    method: 'GET',
    path: '/api/users/{userId}',
    config: require('./actions/fetch')
  });

  hapi.route({
    method: 'POST',
    path: '/api/users/',
    config: require('./actions/post')
  });

  hapi.route({
    method: 'PUT',
    path: '/api/users/{userId}',
    config: require('./actions/update')
  });

  hapi.route({
    method: 'DELETE',
    path: '/api/users/{userId}',
    config: require('./actions/delete')
  });
};
