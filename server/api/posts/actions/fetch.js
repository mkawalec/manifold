'use strict';

var Joi = require('joi');
var utils = require('../../utils');
var Post = require('../model');


function handler(request, reply) {
  Post.Model.getPost(request.params.postId)
  .then(function(post) {
    reply(post).code(200);
  })
  .catch(function(e) {
    console.log(e.stack);
    reply('Not found').code(404);
  });
}

module.exports = {
  handler: handler,
  validate: {
    params: Joi.object({
      postId: utils.JoiUUID
    })
  }
};
