import Post from '../model';

export default function handler(request, reply) {
  Post.Model
    .forge({ id: request.params.postId })
    .bind({})
    .fetch({
      require: true,
      withRelated: [
        'authors'
      ]
    })
    .then(function(post) {
      this.post = post;
    })
    .then(function() {
      return this.post.authors().detach();
    })
    .then(function() {
      return this.post.destroy();
    })
    .then(function() {
      return { id: request.params.postId };
    })
    .nodeify(reply);
}
