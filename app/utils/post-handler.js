export default (hapi) => {
  hapi.ext('onPostHandler', function postHandler(request, reply) {
    const {headers} = request.response;

    if (request.response.variety === 'plain' && 
        request.response.source != null &&
        typeof request.response.source === 'object') {

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
