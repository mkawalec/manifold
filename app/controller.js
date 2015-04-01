import Mustache from 'mustache';
import fs from 'fs';
import fluxApp from 'fluxapp';
fluxApp.setPlatform('node');

import bootstrap from 'manifold/bootstrap';
import StaticController from 'app/static/controller';
import Routes from 'app/routes';

import path from 'path';
const indexTemplate = fs.readFileSync(
  path.join(__dirname, '/../manifold/index.html')).toString();

Mustache.parse(indexTemplate);
bootstrap(fluxApp);

function appHandler(request, reply) {
  fluxApp.render(request).then(function handler(page) {
    return Mustache.render(indexTemplate, { page });
  }).catch(function(err: Object) {
    if (err.code === 404) {
      return reply('Not found').code(404);
    } else if (err.path) {
      return reply.redirect(err.path);
    } else {
      throw err;
    }
  }).nodeify(reply);
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
