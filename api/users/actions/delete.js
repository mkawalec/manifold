import User from '../model';
import Boom from 'boom';

export default function handler(request, reply) {
  if (request.auth.credentials.id !== request.params.userId) {
    throw Boom.unauthorized('You cannot delete others. LOL. Santa dislikes you.');
  }

  return User.Model
    .forge()
    .fetch({ id: request.params.userId })
    .then(user => user.destroy())
    .then(() => {
      request.auth.session.clear();
      return reply('Deleted successfully').code(200);
    });
}
