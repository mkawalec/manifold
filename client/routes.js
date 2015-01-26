'use strict';

module.exports = [
  {
    path: '/',
    method: 'GET',
    handler: require('./components/pages/home')
  },
  {
    path: '/login',
    method: 'GET',
    handler: require('./components/pages/login')
  }
];

