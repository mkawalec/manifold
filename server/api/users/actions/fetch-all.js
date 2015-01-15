'use strict';
var User = require('../model');
var _ = require('lodash');

module.exports = {
  handler : function handler(request, reply) {
    User.Collection
      .forge()
      .fetch()
      .then(function(users) {
        users.models = _.map(users.models, function(user) {
          delete user.attributes.password;
          delete user.attributes.salt;
          return user;
        });

        reply(users).code(200);
      });
  }
}
