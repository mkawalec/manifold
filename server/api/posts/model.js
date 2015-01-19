'use strict';

var Bookshelf = require('bookshelf');
var Users = require('../users/model');


var Post = Bookshelf.PG.Model.extend(
  {
    tableName: 'posts',
    authors: function authors() {
      return this.belongsToMany(Users.Model, 'users_posts');
    }
  },
  {
    getPost: function(id) {
      return Post.forge()
        .query({
          where: {
            id: id
          }
        })
        .fetch({
          require: true,
          withRelated: [
            'authors'
          ]
        })
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
    }
  }
);

module.exports = {
  Model: Post,
  Collection: Posts
};
