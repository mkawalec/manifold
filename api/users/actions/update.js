import User from '../model';
import Boom from 'boom';

export default function handler(request, reply) {
  if (request.auth.credentials.id !== request.params.userId) {
    throw Boom.unauthorized('You cannot modify others');
  }

  User.Model
    .forge()
    .fetch({ id: request.params.userId })
    .then(function(user) {
      if (request.payload.password) {
        if(user.comparePassword(user, request.payload.oldPassword)) {
          user.setPassword(request.payload.password);
          delete request.payload.password;
        } else {
          throw Boom.unauthorized('The password is incorrect');
        }
      }
      
      return user.set(request.payload);
    })
    .then(user => user.save())
    .nodeify(reply);
}
