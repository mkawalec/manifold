'use strict';

var fluxApp = require('fluxapp');
var _ = require('lodash');

module.exports = fluxApp.createStore('login', {
  actions: {
    onLoginSuccess: [ 'account.login', 'account.login:failed' ],
    onSessionDetails: [ 'account.getSession' ]
  },

  getInitialState: function getInitialState() {
    if (typeof document !== 'undefined') {
      var hasSession = _.findWhere(document.cookie.split(';'), function(cookie) {
        return cookie.split('=')[0] === 'session';
      });

      if (hasSession) {
        fluxApp.getActions('account').getSession();
        return { loggedIn: true };
      } else {
        return { loggedIn: false };
      }
    }
  },

  onSessionDetails: function onSessionDetails(data) {
    this.setState({ session: data });
  },

  onLoginSuccess: function onLoginSuccess(data) {
    if (data && data.isBoom) {
      var msg      = JSON.parse(data.message);
      var errorMsg = msg.payload ? msg.payload.status : msg.message;

      this.setState({ fail: errorMsg, success: false });
    } else {
      this.setState({ success: true, fail: false });
      fluxApp.getActions('account').getSession();
    }
  }
});
