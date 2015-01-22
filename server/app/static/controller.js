'use strict';

module.exports = function(hapi) {
  hapi.route({
    method: 'GET',
    path: '/js/{path*}',
    handler: {
      directory : {
        path : 'build/js/'
      }
    }
  });

  hapi.route({
    method: 'GET',
    path: '/css/{path*}',
    handler: {
      directory : {
        path : 'build/css/'
      }
    }
  });
};
