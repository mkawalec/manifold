'use strict';

module.exports = function(hapi) {
  hapi.ext('onPostHandler', function postHandler(request, reply) {
    var headers = request.response.headers;

    if (request.response.variety === 'plain' && 
        typeof request.response.source === 'object') {
      var response = {
        payload: request.response.source,
        statusCode: request.response.statusCode
      };

      reply(response).code(response.statusCode);
    } else {
      reply.continue();
    }
  });
};
