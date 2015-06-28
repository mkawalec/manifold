import Mustache from 'mustache';
import fs from 'fs';
import fluxApp from 'fluxapp';
import fetcher from 'fluxapp-fetch';
import path from 'path';
import Promise from 'bluebird';
import React from 'react';

import 'manifold/bootstrap';

import StaticController from 'app/static/controller';
import Routes from 'app/routes';
import server from 'app/server';

const indexFile = path.join(__dirname, '/../manifold/index.html');
const indexTemplate = fs.readFileSync(indexFile).toString();
const router = fluxApp.getRouter();

Mustache.parse(indexTemplate);

function appHandler(request, reply) {
  const context = fluxApp.createContext({
    fetcher: fetcher('hapi', {
      request,
    }),
    getUser: () => request.auth.credentials,
  });

  // Thanks to that, current route will also be available
  // on the server side
  context.getRouterActions().init(request.path, {
    method: request.method,
  });

  return context.getPageContext(request.path, {
    method: request.method,
    dehydrate: true,
    async: true,
  }).then(page => {
    const markup = page.element ? React.renderToString(page.element) : void(0);

    if (! markup) {
      throw Boom.notFound();
    } else {
      reply(Mustache.render(indexTemplate, {
        page: markup,
        state: JSON.stringify({
          state: page.state(),
          method: page.method,
        })
      }));
    }
  }).catch(err => {
    if (err.then) {
      return err.then(error => {
        if (error[0] === 'ROUTER_GO') {
          reply.redirect(error[1].path);
        } else {
          throw error;
        }
      });
    } else {
      throw err;
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
