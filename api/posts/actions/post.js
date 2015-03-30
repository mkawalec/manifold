'use strict';
var Joi = require('joi');
var Post = require('../model');
var User = require('../../users/model');
var Promise = require('bluebird');


function handler(request, reply) {

  var post = Post.Model.forge({
    post: request.payload.post,
    published: request.payload.published || false
  })
  .save()
  .then(function(post) {
    return post.authors().attach([ request.auth.credentials.id ])
      .then(function() {
        return post;
      });
  }).then(function(post) {
    reply(post).code(200);
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
