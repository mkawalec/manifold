'use strict';
var Joi = require('joi');
var User = require('../model');


function handler(request, reply) {
  User.Model.createUser(request.payload.username, request.payload.password)
    .then(function(data) {
      reply('created').code(201);
    }).catch(function(e) {
      reply(e.message).code(409);
    });
}

module.exports = {
  handler: handler,
  validate: {
    payload: Joi.object({
      username: Joi.string().alphanum().min(3).required(),
      password: Joi.string().regex(/\S{8,}/).required(),
      email: Joi.string().email().trim()
    })
  }
};
