import User from '../model';
import Boom from 'boom';

export default function handler(request, reply) {
  if (request.auth.credentials.id !== request.params.userId) {
    throw Boom.unauthorized('You cannot modify others, come on');
  }

  User.Model
    .forge({ id: request.params.userId })
    .fetch({ require: true })
    .then(function(user) {
      console.log('user', user);
      if (request.payload.password) {
        if (User.Model.comparePassword(user, request.payload.oldPassword)) {
          user.setPassword(request.payload.password);
          delete request.payload.password;
          delete request.payload.oldPassword;
        } else {
          throw Boom.unauthorized('The current password is incorrect');
        }
      }

      return user.set(request.payload);
    })
    .then(user => user.save())
    .then(User.cleanSensitiveData)
    .nodeify(reply);
}
