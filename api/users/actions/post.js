import User from '../model';

export default function handler(request, reply) {
  User.Model
    .createUser(request.payload)
    .save()
    .then(User.cleanSensitiveData)
    .nodeify(reply);
}
