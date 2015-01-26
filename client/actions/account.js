'use strict';

var fluxApp = require('fluxapp');
var api = require('iso-fetch');

module.exports = fluxApp.createActions('account', {
  login: function login(payload) {
    return api.request({ 
      url: '/login', 
      method: 'POST',
      payload: payload
    });
  },

  getSession: function getSession() {
    return api.request({
      url: '/session',
      method: 'GET'
    });
  }
});
