'use strict';

var React = require('react');
var fluxApp = require('fluxapp');
var Promise = require('bluebird');
var _ = require('lodash');


module.exports = React.createClass({
  mixins: [ fluxApp.mixins.component ],
  
  displayName: 'home',

  statics: {
    load: function loadComponent(route) {
      var postActions = fluxApp.getActions('posts');

      return Promise.props({
        posts: postActions.getAll()
      });
    }
  },
      

  render: function renderHomePage() {
    console.log(this.getStore('posts').state);
    return (
      <div>
        Hi, this is a home page
      </div>
    );
  }
});
