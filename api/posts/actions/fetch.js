import Post from '../model';

export default function handler(request, reply) {
  Post.Model
    .getPost(request.params.postId)
    .nodeify(reply);
}
