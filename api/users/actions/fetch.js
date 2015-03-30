'use strict';
var User = require('../model');
var _ = require('lodash');
var Joi = require('joi');
var utils = require('../../utils');

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
      userId: utils.JoiUUID
    })
  }
}
