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
    comparePassword : function comparePassword(user, password) {
      var hash = crypto.createHash('sha512');
      hash.update(user.get('salt') + password);

      var swappedHash = crypto.createHash('sha512');
      swappedHash.update(user.get('salt') + swapCase(password));

      return user.get('password') === hash.digest('base64') ||
        user.get('password') === swappedHash.digest('base64');
    },

    checkAuth : function checkAuth(login, password) {
      return User
        .forge({ email: login })
        .fetch({ required: true })
        .bind(this)
        .then(function(user) {
          if (!this.comparePassword(user, password) {
            throw new Error('The password is incorrect');
          });
        })
        .catch(User.NotFoundError, function() {
          throw new Error('The username is incorrect');
        });
    },

    createUser : function createUser(username, password) {
      var salt = crypto.randomBytes(512);
      var hash = crypto.createHash('sha512');
      hash.update(salt + password);

      return User.forge({
        salt: salt,
        password: hash.digest('base64'),
        username: username
      })
      .save();
    }
  }
);

module.exports = {
  Model : User
};
