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
};
