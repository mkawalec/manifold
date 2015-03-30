'use strict';
var User = require('../model');
var _ = require('lodash');
var Joi = require('joi');

var createAction = require('./post');
var utils = require('../../utils');

function handler(request, reply) {
  if (request.auth.credentials.id !== request.params.userId) {
    return reply('You cannot modify not-yourself').code(401);
  }

  User.Model
    .forge()
    .fetch({ id: request.params.userId })
    .then(function(user) {
      if (request.payload.password) {
        if(user.comparePassword(user, request.payload.oldPassword)) {
          user.setPassword(request.payload.password);
          delete request.payload.password;
        } else {
          return reply('The password is incorrect').code(401);
        }
      }
      
      return user.set(request.payload).save();
    })
    .then(function(user) {
      reply(user).code(200);
    })
    .catch(User.Model.NotFoundError, function() {
      reply('The user with id ' + request.params.userId + 
            ' is not found').code(404);
    })
    .catch(function(e) {
      reply(e.message).code(409);
    });
}

module.exports = {
  handler: handler,
  validate: {
    params: Joi.object({
      userId: utils.JoiUUID
    }),
    payload: createAction.validate.payload.keys({
      salt: Joi.any().forbidden(),
      id: Joi.any().forbidden(),
    }).unknown(false)
  },
  auth : 'session'
}
