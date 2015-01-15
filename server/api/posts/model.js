'use strict';

var Bookshelf = require('bookshelf');

var Post = Bookshelf.PG.Model.extend(
  {
    tableName: 'posts'
  },
  {
  }
);

module.exports = {
  Model : Post
};
