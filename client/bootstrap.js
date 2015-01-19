'use strict';

var fluxApp = require('fluxapp');
var router = require('fluxapp-router');
router.use(fluxApp);
fluxApp.createRoutes(require('./routes'));

require('./actions');
require('./stores');

module.exports = fluxApp;
