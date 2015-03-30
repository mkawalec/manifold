'use strict';

var _         = require('lodash');
var Bookshelf = require('bookshelf');
var crypto    = require('crypto');
var swapCase  = require('swap-case');


var User = Bookshelf.PG.Model.extend(
  {
    tableName: 'users'
  },
  {
    comparePassword: function comparePassword(user, password) {
      var hash = crypto.createHash('sha512');
      hash.update(user.get('salt') + password);

      var swappedHash = crypto.createHash('sha512');
      swappedHash.update(user.get('salt') + swapCase(password));

      return user.get('password') === hash.digest('base64') ||
        user.get('password') === swappedHash.digest('base64');
    },

    checkAuth: function checkAuth(username, password) {
      return User
        .forge({ username: username })
        .fetch({ require: true })
        .bind(this)
        .then(function(user) {
          if (!this.comparePassword(user, password)) {
            throw new Error('The password is incorrect');
          };
          return user;
        });
    },

    createUser: function createUser(username, password) {
      var salt = crypto.randomBytes(128).toString('base64');
      var hash = crypto.createHash('sha512');
      hash.update(salt + password);

      return User.forge({
        salt: salt,
        password: hash.digest('base64'),
        username: username
      })
      .save();
    },

    setPassword : function setPassword(password) {
      var hash = crypto.createHash('sha512');
      hash.update(user.get('salt') + password);

      this.set({ password: hash.digest('base64') })
    }
  }
);

var Users = Bookshelf.PG.Collection.extend(
  {
    model: User
  },
  {
  }
);

module.exports = {
  Model: User,
  Collection: Users
};
