import Mustache from 'mustache';
import fs from 'fs';
import fluxApp from 'fluxapp';
import server from 'app/server';
fluxApp.setPlatform('node', {
  fetch: {
    hapi: { server: server }
  }
});

import bootstrap from 'manifold/bootstrap';
import StaticController from 'app/static/controller';
import Routes from 'app/routes';

import path from 'path';
const indexTemplate = fs.readFileSync(
  path.join(__dirname, '/../manifold/index.html')).toString();

Mustache.parse(indexTemplate);
bootstrap(fluxApp);

function appHandler(request, reply) {
  const params = {
    cookie: request.headers.cookie
  };

  fluxApp.render(request, params).then(function handler(page) {
    const rendered = Mustache.render(indexTemplate, { page });
    return reply(rendered);
  }).catch(function(err: Object) {
    if (err.code === 404) {
      return reply('Not found').code(404);
    } else if (err.path) {
      return reply.redirect(err.path);
    } else {
      console.log(err.stack);
      reply(err);
    }
  });
}

export default (hapi) => {
  StaticController(hapi);
  Routes(hapi);

  hapi.route({
    method : '*',
    path : '/{path*}',
    handler : appHandler
  });
};
