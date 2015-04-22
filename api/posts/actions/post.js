import Post from '../model';

export default function handler(request, reply) {
  let {post, published, title} = request.payload;
  published = published || false;

  const authorId = request.auth.credentials.id;

  Post.Model
    .forge({ post, title, published })
    .save()
    .bind({})
    .then(function(dbPost) {
      this.id = dbPost.id;
      return dbPost;
    })
    .then(dbPost => dbPost.authors().attach([ authorId ]))
    .then(function() {
      return this;
    })
    .nodeify(reply);
}
