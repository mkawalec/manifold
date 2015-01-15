'use strict';
var User = require('../model');
var _ = require('lodash');
var Joi = require('joi');

function handler(request, reply) {
  User.Model
    .forge()
    .fetch({ id: request.params.userId })
    .then(function(user) {
      delete user.attributes.password;
      delete user.attributes.salt;

      reply(user).code(200);
    })
    .catch(function(e) {
      reply(e.message).code(404);
    });
}

module.exports = {
  handler: handler,
  validate: {
    params: Joi.object({
      userId: Joi.string().regex(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)
    })
  }
}
