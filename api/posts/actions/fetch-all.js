import Post from '../model';

export default function handler(request, reply) {
  console.log('got fetch all');
  Post.Collection
    .getPosts()
    .nodeify(reply);
}
