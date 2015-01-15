'use strict';

module.exports = function(hapi) {

  /*
  hapi.route({
    method: 'GET',
    path: '/api/posts/',
    config: require('./actions/fetch-all')
  });

  hapi.route({
    method: 'GET',
    path: '/api/posts/{postId}',
    config: require('./actions/fetch')
  });*/

  hapi.route({
    method: 'POST',
    path: '/api/posts/',
    config: require('./actions/post')
  });

  /*
  hapi.route({
    method: 'PUT',
    path: '/api/posts/{postId}'
    config: require('./actions/update')
  });

  hapi.route({
    method: 'DELETE',
    path: '/api/posts/{postId}'
    config: require('./actions/delete')
  });
*/
};
