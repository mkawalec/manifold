'use strict';

function logout(request, reply) {
  request.auth.session.clear();
  return reply.redirect('/');
}

module.exports = {
  handler: logout,
  auth: 'session'
};
