'use strict';

module.exports = function(hapi) {
  require('./users/controller')(hapi);
  require('./posts/controller')(hapi);
};
