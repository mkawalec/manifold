import Post from '../model';

export default function handler(request, reply) {
  Post.Collection
    .getPosts()
    .then(posts => reply(posts).code(200));
}
