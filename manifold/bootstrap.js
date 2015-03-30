'use strict';

export default (fluxApp) => {
  fluxApp.createRoutes(require('./routes'));
  require('./actions');
  require('./stores');
};
