'use strict';

var Joi = require('joi');
var utils = require('../../utils');
var Post = require('../model');
var _ = require('lodash');


function handler(request, reply) {
  Post.Model.forge({ id: request.params.postId })
  .fetch({ 
    require: true,
    withRelated: [
      'authors'
    ]
  })
  .then(function(post) {
    // If the user is not yet on the authors list, add her
    var isAuthor = _.some(post.related('authors').models, function(author) {
      return author.get('id') === request.auth.credentials.id;
    });

    if (!isAuthor) {
      post.authors().attach([ request.auth.credentials.id ]);
    }

    post.set(request.payload);
    return post.save();
  })
  .then(function(post) {
    post = JSON.parse(JSON.stringify(post));
    post = Post.cleanRelated(post);
    return reply(post).code(200);
  })
  .catch(function(e) {
    reply('Not found').code(404);
  });
}

module.exports = {
  handler: handler,
  validate: {
    params: Joi.object({
      postId: utils.JoiUUID
    }),
    payload: Joi.object({
      post: Joi.string(),
      published: Joi.boolean()
    }).unknown(false)
  },
  auth: 'session'
};
