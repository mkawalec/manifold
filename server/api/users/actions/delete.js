'use strict';
var User = require('../model');
var _ = require('lodash');
var Joi = require('joi');

var createAction = require('./post');
var utils = require('../../utils');

function handler(request, reply) {
  if (request.auth.credentials.id !== request.params.userId) {
    return reply('You cannot delete others. LOL. Santa dislikes you.')
      .code(401);
  }

  User.Model
    .forge()
    .fetch({ id: request.params.userId })
    .then(function(user) {
      return user.destroy();
    })
    .then(function() {
      request.auth.session.clear();
      return reply('Deleted successfully').code(200);
    })
    .catch(User.Model.NotFoundError, function() {
      reply('The user with id ' + request.params.userId + 
            ' is not found').code(404);
    });
}

module.exports = {
  handler: handler,
  validate: {
    params: Joi.object({
      userId: utils.JoiUUID
    })
  },
  auth: 'session'
}
