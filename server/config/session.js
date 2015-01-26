'use strict';
var env = process.env;

module.exports = {
  password: env.COOKIE_PASS || 'this is very insecure',
  cookie: 'session',
  isSecure: false,
  isHttpOnly: false
};
