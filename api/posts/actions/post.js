import Post from '../model';

export default function handler(request, reply) {
  let {post, published} = request.payload;
  published = published || false;

  const authorId = request.auth.credentials.id;

  Post.Model
    .forge({ post, published })
    .save()
    .then(post => post.authors().attach([ authorId ]))
    .nodeify(reply);
}
