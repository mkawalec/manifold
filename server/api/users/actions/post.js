'use strict';
var Joi = require('joi');
var User = require('../model');

function handler(request, reply) {
  User.Model.createUser(request.payload.username, request.payload.password)
    .then(function(user) {
      delete user.attributes.password;
      delete user.attributes.salt;
      
      reply(user).code(201);
    }).catch(function(e) {
      reply(e.message).code(409);
    });
}

module.exports = {
  handler: handler,
  validate: {
    payload: Joi.object({
      username: Joi.string().alphanum().min(3).required(),
      password: Joi.string().min(6).regex(/\S{6,}/).required(),
      email: Joi.string().email().trim()
    })
  }
};
