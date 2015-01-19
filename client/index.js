'use strict';

var fluxApp = require('./bootstrap');
var React = require('react');
var router = require('fluxapp-router');

var routeStore = router.getStore();
var serverPayload = window.payloadFromServer || {};

routeStore.addChangeListener(function(change) {
  var route = routeStore.state.current.route;
  var isInitialRender = !!routeStore.state.history.length;
  var Component = route.handler;

  if (isInitialRender) {
    fluxApp.rehydrate(serverPayload.state);

    React.render(React.createElement(Component, {
      serverSideRendered: true
    }), document.getElementById('app-container'));
  } else {
    Component.load(route).then(function renderNonInitial() {
      React.render(React.createElement(Component, {
        serverSideRendered: false
      }), document.getElementById('app-container'));
    });
  }
});

router.init();
