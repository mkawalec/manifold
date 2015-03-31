export default [
  {
    path: '/',
    method: 'GET',
    handler: require('manifold/pages/home')
  },
  {
    path: '/login',
    method: 'GET',
    handler: require('manifold/pages/login')
  }
];

