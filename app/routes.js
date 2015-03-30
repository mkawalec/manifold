export default (hapi) => {
  hapi.route({
    method: 'POST',
    path: '/login',
    config: require('app/session/login')
  });

  hapi.route({
    method: 'GET',
    path: '/logout',
    config: require('app/session/logout')
  });

  hapi.route({
    method: 'GET',
    path: '/session',
    config: require('app/session/getSession')
  });

  require('api/controller')(hapi);
}
