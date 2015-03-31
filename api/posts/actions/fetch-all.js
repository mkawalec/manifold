import Post from '../model';

export default function handler(request, reply) {
  Post.Collection
    .getPosts()
    .nodeify(reply);
}
