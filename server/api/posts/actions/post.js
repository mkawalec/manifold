'use strict';
var Joi = require('joi');
var Post = require('../model');

function handler(request, reply) {
  Post.Model.forge({
    post: request.payload.post,
    published: request.payload.published
  })
  .then(function(post) {
    reply(post).code(201);
  }).catch(function(e) {
    reply(e.message).code(409);
  });
}

module.exports = {
  handler: handler,
  validate: {
    payload: Joi.object({
      post: Joi.string().required(),
      published: Joi.boolean()
    })
  },
  auth: 'session'
};
