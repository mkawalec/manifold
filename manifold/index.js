/* global window,document */
import 'manifold/bootstrap';
import fluxApp from 'fluxapp';
import React from 'react';

const appElement = document.getElementById('fluxapp-container');
const serverState = window.fluxAppState;

const ContextWrapper = fluxApp.createWrapper();
let context = fluxApp.createContext({
  fetcher: require('iso-fetch')('jquery'),
});

const routerActions = context.getRouterActions();
context.rehydrate(serverState.state || {});

context.registerRouteHandler(function routeHandler(request) {
  const {route} = request;
  const render = function renderContextWrapper() {
    React.render(
      React.createElement(
        ContextWrapper,
        {
          request: request,
          query: request.query,
          params: request.params,
          context: context,
          handler: route.handler,
        }
      ),
      appElement
    );
  };

  if (!request.lastRequest) {
    route.loader(request, context).then(render);
  } else {
    render();
  }
});

routerActions.init(window.location.href, {
  method: serverState.metod,
});
