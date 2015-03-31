import Post from '../model';

export default function handler(request, reply) {
  Post.Model
    .forge({ id: request.params.postId })
    .fetch({ require: true })
    .then(post => post.destroy())
    .nodeify(reply);
}
