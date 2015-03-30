'use strict';
function getData(request, reply) {
  reply(request.auth.credentials).code(200)
}

module.exports = {
  handler: getData,
  auth: 'session'
};
