import Joi from 'joi';
import R from 'ramda';

export const USER_PROPS = {
  username: Joi.string().alphanum().min(3).required(),
  password: Joi.string().min(6).regex(/\S{6,}/).required(),
  email: Joi.string().email().trim()
}

export default (hapi) => {

  hapi.route({
    method: 'GET',
    path: '/api/users/',
    config: {
      handler: require('./actions/fetch-all')
    }
  });

  hapi.route({
    method: 'GET',
    path: '/api/users/{userId}',
    config: {
      handler: require('./actions/fetch'),
      validate: {
        params: Joi.object({
          userId: Joi.string().guid()
        })
      }
    }
  });

  hapi.route({
    method: 'POST',
    path: '/api/users/',
    config: {
      handler: require('./actions/post'),
      validate: {
        payload: Joi.object(USER_PROPS)
      }
    }
  });

  hapi.route({
    method: 'PUT',
    path: '/api/users/{userId}',
    config: {
      handler: require('./actions/update'),
      validate: { 
        params: Joi.object({
          userId: Joi.string().guid()
        }),
        payload: Joi.object(R.merge(USER_PROPS, {
          salt: Joi.any().forbidden(),
          id: Joi.any().forbidden(),
        })).unknown(false)
      },
      auth: 'session'
    }
  });

  hapi.route({
    method: 'DELETE',
    path: '/api/users/{userId}',
    config: {
      handler: require('./actions/delete'),
      validate: {
        params: Joi.object({
          userId: Joi.string().guid()
        })
      },
      auth: 'session'
    }
  });
};
