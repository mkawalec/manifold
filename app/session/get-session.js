export default function getData(request, reply) {
  console.log('sending', reply.auth.credentials);
  reply(request.auth.credentials);
}
