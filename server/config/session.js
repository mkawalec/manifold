'use strict';
var env = process.env;

module.exports = {
  options : {
    cookiePass : env.COOKIE_PASS || 'this is very insecure',
    cookie     : 'session',
    isSecure   : false
  }
};
