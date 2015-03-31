export default function logout(request, reply) {
  request.auth.session.clear();
  return reply.redirect('/');
}
