'use strict';

var Post = require('../model');

function handler(request, reply) {
  Post.Collection.getPosts()
  .then(function(posts) {
    reply(posts).code(200);
  });
}

module.exports = {
  handler: handler
};
