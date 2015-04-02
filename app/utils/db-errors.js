import Bookshelf from 'bookshelf';
import Boom from 'boom';

const DUP_KEY = /^duplicate key value violates unique constraint/i;
const NOT_NULL = /^null value in column ".*" violates not-null constraint$/i;
const FOREIGN_KEY = /^insert or update on table ".*" violates foreign key constraint/;

export default function register(hapi) {
  hapi.ext('onPreResponse', function preResponseHandler(request, reply) {
    if (! request.response.isBoom) {
      return reply.continue();
    }

    if (request.response instanceof Bookshelf.PG.NotFoundError) {
      return reply(Boom.notFound());
    } else if (request.response instanceof Error) {
      let err = request.response;

      if (err.message.match(DUP_KEY)) {
        return reply(Boom.conflict(err.detail));
      } else if (err.message.match(NOT_NULL)) {
        return reply(Boom.badData(err.detail));
      } else if (err.message.match(FOREIGN_KEY)) {
        return reply(Boom.badData(err.detail));
      }
      console.log(request.response.stack);
    }

    return reply.continue();
  });
}
