import Post from '../model';

export default function handler(request, reply) {
  let {post, published, title} = request.payload;
  published = published || false;

  const authorId = request.auth.credentials.id;

  Post.Model
    .forge({ post, title, published })
    .save()
    .bind({})
    .then(function(post) { 
      this.id = post.id;
      return post;
    })
    .then(post => post.authors().attach([ authorId ]))
    .then(function() { 
      return this;
    })
    .nodeify(reply);
}
