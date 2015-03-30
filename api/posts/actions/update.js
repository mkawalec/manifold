import Post from '../model';
import R from 'ramda';

const cleanBookshelf = R.compose(JSON.parse, JSON.stringify);

export default function handler(request, reply) {
  const userId = request.auth.credentials.id;

  Post.Model
    .forge({ id: request.params.postId })
    .fetch({ 
      require: true,
      withRelated: [
        'authors'
      ]
    })
    .then(post => {
      const isAuthor = R.any(author => author.get('id') === userId)
        (post.related('authors').models);
      
      if (!isAuthor) {
        post.authors().attach([ userId ]);
      }

      return post.set(request.payload).save();
    })
    .then(cleanBookshelf)
    .then(Post.cleanRelated)
    .then(reply);
}
