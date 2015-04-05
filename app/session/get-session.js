export default function getData(request, reply) {
  reply(request.auth.credentials);
}
