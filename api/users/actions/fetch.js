import User from '../model';

export default function handler(request, reply) {
  User.Model
    .forge()
    .fetch({ id: request.params.userId })
    .then(User.cleanSensitiveData)
    .nodeify(reply);
}
