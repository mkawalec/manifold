import Bookshelf from 'bookshelf';
import Boom from 'boom';
import crypto from 'crypto';
import swapCase from 'swap-case';
import R from 'ramda';

function cleanSensitiveData(user) {
  if (user.attributes) {
    delete user.attributes.password;
    delete user.attributes.salt;
  } else {
    delete user.password;
    delete user.salt;
  }
  return user;
}

const Model = Bookshelf.PG.Model.extend({
  tableName: 'users'
}, {
  comparePassword(user, password) {
    const salt = user.get('salt');
    let hash = crypto.createHash('sha512');
    hash.update(salt + password);

    let swappedHash = crypto.createHash('sha512');
    swappedHash.update(salt + swapCase(password));

    return user.get('password') === hash.digest('base64') ||
      user.get('password') === swappedHash.digest('base64');
  },

  checkAuth(username, password) {
    return Model
      .forge({ username })
      .fetch({ require: true })
      .bind(this)
      .then(function(user) {
        if (!this.comparePassword(user, password)) {
          throw Boom.unauthorized('The password is incorrect');
        };
        return user;
      });
  },

  createUser(props) {
    const salt = crypto.randomBytes(128).toString('base64');
    let hash = crypto.createHash('sha512');
    hash.update(salt + password);

    props = R.merge(props, {
      salt,
      password: hash.digest('base64')
    });

    return Model.forge(props);
  },

  setPassword : function setPassword(password) {
    var hash = crypto.createHash('sha512');
    hash.update(user.get('salt') + password);

    this.set({ password: hash.digest('base64') })
  }
});

const Collection = Bookshelf.PG.Collection.extend({
  model: Model
});

module.exports = {
  Model,
  Collection,
  cleanSensitiveData
};
