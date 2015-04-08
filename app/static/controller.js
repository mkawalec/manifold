export default (hapi) => {
  hapi.route({
    method: 'GET',
    path: '/js/{path*}',
    handler: {
      directory : {
        path : 'dist/js/'
      }
    }
  });

  hapi.route({
    method: 'GET',
    path: '/vendor/{path*}',
    handler: {
      directory : {
        path : 'app/vendor/'
      }
    }
  });
};
