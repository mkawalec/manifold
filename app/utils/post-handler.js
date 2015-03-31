export default (hapi) => {
  hapi.ext('onPostHandler', function postHandler(request, reply) {
    /*eslint-disable no-eq-null */
    if (request.response.variety === 'plain' &&
        request.response.source != null &&
        typeof request.response.source === 'object') {
    /*eslint-enable no-eq-null */

      const response = {
        payload: request.response.source,
        statusCode: request.response.statusCode
      };

      reply(response).code(response.statusCode);
    } else {
      reply.continue();
    }
  });
};
