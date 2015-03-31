import User from 'api/users/model';

export default function login(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/');
  }

  const {username, password} = request.payload;

  User.Model.checkAuth(username, password)
    .then(user => {
      request.auth.session.set({
        id: user.get('id'),
        username: user.get('username'),
        email: user.get('email')
      });

      return reply.redirect('/');
    });
}
