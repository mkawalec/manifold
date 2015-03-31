import Bookshelf from 'bookshelf';
import Users from 'api/users/model';
import R from 'ramda';

const TO_CLEAN = [ 'password', 'salt', '_pivot_post_id', '_pivot_user_id' ];

function cleanRelated(post) {
  post.authors = R.map(author => {
    R.forEach(property => delete author[property], TO_CLEAN);
    return author;
  }, post.authors);

  return post;
}

const Post = Bookshelf.PG.Model.extend(
  {
    tableName: 'posts',
    authors: function authors() {
      return this.belongsToMany(Users.Model, 'users_posts');
    }
  },
  {
    getPost: (id) => {
      return Post
        .forge({ id })
        .fetch({
          require: true,
          withRelated: [
            'authors'
          ]
        })
        .then(post => JSON.parse(JSON.stringify(post)))
        .then(cleanRelated);
    }
  }
);

const Posts = Bookshelf.PG.Collection.extend(
  {
    model: Post
  },
  {
    getPosts: function getPosts() {
      return Posts
        .forge()
        .fetch({
          withRelated: [ 'authors' ]
        })
        .then(post => JSON.parse(JSON.stringify(post)))
        .then(R.map(cleanRelated));
    }
  }
);

module.exports = {
  Model: Post,
  Collection: Posts,

  cleanRelated: cleanRelated
};
