import Joi from 'joi';
import R from 'ramda';

export const USER_PROPS = {
  username: Joi.string().alphanum().min(3).required(),
  password: Joi.string().min(5).regex(/\S{5,}/).required(),
  email: Joi.string().email().trim()
};

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
        payload: Joi.object({
          salt: Joi.any().forbidden(),
          id: Joi.any().forbidden(),
          oldPassword: Joi.string().min(5).optional(),
          username: Joi.string().alphanum().min(3).optional(),
          password: Joi.string().min(5).regex(/\S{5,}/).optional(),
          email: Joi.string().email().trim().optional(),
        }).unknown(false)
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
