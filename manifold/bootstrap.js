import fluxApp from 'fluxapp';
import fluxAppRouter from 'fluxapp-router';

fluxApp.registerPlugins({
  router: fluxAppRouter,
});

fluxApp.registerRoutes(require('./routes'));

require('./actions');
require('./stores');

export default fluxApp;
