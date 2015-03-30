import Mustache from 'mustache';
import fs from 'fs';
import fluxApp from 'fluxapp';
fluxApp.setPlatform('node');

import bootstrap from 'manifold/bootstrap';
import StaticController from 'app/static/controller';
import Routes from 'app/routes';

bootstrap(fluxApp);
const indexTemplate = fs.readFileSync(__dirname + '/../manifold/index.html').toString();

Mustache.parse(indexTemplate);

function appHandler(request, reply) {
  fluxApp.render(request).then(function handler(page) {
    const rendered = Mustache.render(indexTemplate, { page })
    reply(rendered).code(200);
  }).catch(function(err) {
    if (err === 404) {
      return reply('Not found').code(404);
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
    handler : appHandler
  });
};
