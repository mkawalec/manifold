import Mustache from 'mustache';
import fs from 'fs';
import fluxApp from 'fluxapp';
import isoFetch from 'iso-fetch';
import path from 'path';
import Promise from 'bluebird';
import React from 'react';

import 'manifold/bootstrap';

import StaticController from 'app/static/controller';
import Routes from 'app/routes';
import server from 'app/server';

const indexFile     = path.join(__dirname, '/../manifold/index.html');
const indexTemplate = fs.readFileSync(indexFile).toString();
const router        = fluxApp.getRouter();

Mustache.parse(indexTemplate);

function appHandler(request, reply) {
  const routeRequest = router.build(request.path, {
    method: request.method
  });

  if (!routeRequest) {
    return reply('route not found').code(404);
  }

  const route = router.getRouteById(routeRequest.routeId);
  const ContextWrapper = fluxApp.createWrapper();
  const context = fluxApp.createContext({
    fetcher: isoFetch('hapi', {
      request,
    }),
    getUser: () => request.auth.credentials,
  });

  let redirected = false;
  context.registerRouteHandler(request => {
    redirected = true;
    reply.redirect(request.path);
  });

  route.loader(routeRequest, context).then(() => {
    if (redirected) {
      return;
    }

    const Component = React.createFactory(ContextWrapper);
    const markup = React.renderToString(Component({
      handler: route.handler,
      context: context,
      params: routeRequest.params,
      query: routeRequest.query,
      request: routeRequest,
    }));

    const state = {
      method: request.method,
      state: context.dehydrate(),
    };

    context.destroy();

    reply(Mustache.render(indexTemplate, {
      page: markup,
      state: JSON.stringify(state),
    }));
  }).catch(err => {
    if (! err.then) {
      if (err === 404) {
        reply('Not found, sorry').code(404);
      } else {
        reply(err);
      }
    }
  });
}

export default (hapi) => {
  StaticController(hapi);
  Routes(hapi);

  hapi.route({
    method : '*',
    path : '/{path*}',
    config : {
      auth: {
        mode: 'try',
        strategy: 'session',
      },
    },
    handler : appHandler
  });
};
