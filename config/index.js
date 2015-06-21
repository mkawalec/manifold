import Confidence from 'confidence';

const env = process.env.NODE_ENV || 'development';

const store = new Confidence.Store({
  name : 'Manifold (Server)',
  server : {
    host : process.env.HOST || '0.0.0.0',
    port : process.env.PORT || 6000,
    env  : env
  },
  knex    : require('./knex'),
  session : require('./session'),
  client  : require('./client'),
});

export default {
  get: (key) => store.get(key, { env : env }),
  meta: (key) => store.meta(key, { env : env })
};
