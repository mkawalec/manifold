'use strict';

var Bookshelf = require('bookshelf');
var Users = require('../users/model');
var _ = require('lodash');


var TO_CLEAN = [
  'password', 'salt', '_pivot_post_id', '_pivot_user_id' 
];

function cleanRelated(post) {
  post.authors = _.map(post.authors, function(author) {
    _.forEach(TO_CLEAN, function(property) {
      delete author[property];
    });
    return author;
  });
  return post;
}

var Post = Bookshelf.PG.Model.extend(
  {
    tableName: 'posts',
    authors: function authors() {
      return this.belongsToMany(Users.Model, 'users_posts');
    }
  },
  {
    getPost: function(id) {
      return Post.forge({ id: id })
        .fetch({
          require: true,
          withRelated: [
            'authors'
          ]
        })
        .then(function(post) {
          post = JSON.parse(JSON.stringify(post));
          return cleanRelated(post);
        });
    }
  }
);

var Posts = Bookshelf.PG.Collection.extend(
  {
    model: Post
  },
  {
    getPosts: function getPosts() {
      return Posts.forge()
        .fetch({
          withRelated: [
            'authors'
          ]
        })
        .then(function(posts) {
          posts = JSON.parse(JSON.stringify(posts));

          // We don't want certain columns, and there doesn't seem to be
          // a cleaner way of doing that in bookshelf
          return _.map(posts, cleanRelated);
        });
              
    }
  }
);

module.exports = {
  Model: Post,
  Collection: Posts,

  cleanRelated: cleanRelated
};
