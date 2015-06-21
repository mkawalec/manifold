/* global window,document */
import 'manifold/bootstrap';
import fluxApp from 'fluxapp';
import React from 'react';

const appElement = document.getElementById('fluxapp-container');
const serverState = window.fluxAppState;

let context = fluxApp.createContext({
  fetcher: require('fluxapp-fetch')('jquery'),
});

const routerActions = context.getRouterActions();

function render(page) {
  React.render(
    page.element,
    appElement
  );
}

context.registerRouteHandler(function routeHandler(request) {
  const isFirstRequest = ! request.lastRequest;
  let options = {
    async: true,
  };

  if (isFirstRequest) {
    options = {
      async: false,
      noLoader: true,
      state: serverState.state,
    };
  }

  context.getPageContext(request, options).then(render);
});

routerActions.init(window.location.href, {
  method: serverState.metod,
});
