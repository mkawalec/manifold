import Joi from 'joi';
import R from 'ramda';
import {USER_PROPS} from 'api/users/controller';

export default (hapi) => {
  hapi.route({
    method: 'POST',
    path: '/login',
    config: {
      handler: require('app/session/login'),
      validate: {
        payload: Joi.object(R.merge(USER_PROPS, {
          email: Joi.any().forbidden()
        })).unknown(false)
      },
      auth: {
        mode: 'try',
        strategy: 'session'
      }
    }
  });

  hapi.route({
    method: 'GET',
    path: '/logout',
    config: {
      handler: require('app/session/logout'),
      auth: 'session'
    }
  });

  hapi.route({
    method: 'GET',
    path: '/session',
    config: {
      handler: require('app/session/get-session'),
      auth: 'session'
    }
  });

  require('api/controller')(hapi);
}
