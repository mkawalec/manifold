'use strict';

var fluxApp = require('fluxapp');
var api = require('iso-fetch');

module.exports = fluxApp.createActions('posts', {
  getAll: function getAll() {
    return api.request({ url: '/api/posts/' });
  }
});
