'use strict';

var fluxApp = require('fluxapp');

module.exports = fluxApp.createStore('posts', {
  actions: {
    onGetAll: 'posts.getAll'
  },

  onGetAll: function onGetAll(data) {
    this.setState(data);
  }
});
