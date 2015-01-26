'use strict';
var Joi = require('joi');

var createAction = require('../../api/users/actions/post');
var User = require('../../api/users/model');

function login(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/');
  }

  User.Model.checkAuth(request.payload.username, request.payload.password)
    .then(function(user) {
      request.auth.session.set({
        id: user.get('id'),
        username: user.get('username'),
        email: user.get('email')
      });
      return reply.redirect('/');
    })
    .catch(User.Model.NotFoundError, function() {
      reply({ status: 'Incorrect username' }).code(404);
    })
    .catch(function(e) {
      reply({ status: 'Username and password don\'t match' }).code(401);
    });
}

module.exports = {
  handler: login,
  validate: {
    payload: createAction.validate.payload.keys({
      email: Joi.any().forbidden()
    }).unknown(false)
  },
  auth: {
    mode: 'try',
    strategy: 'session'
  },
};
