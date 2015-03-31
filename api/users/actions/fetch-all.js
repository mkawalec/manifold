import User from '../model';
import R from 'ramda';

export default function handler(request, reply) {
  User.Collection
    .forge()
    .fetch()
    .then(users => JSON.parse(JSON.stringify(users)))
    .then(R.map(User.cleanSensitiveData))
    .nodeify(reply);
}
