import Joi from 'joi';

export default (hapi) => {
  hapi.route({
    method: 'GET',
    path: '/api/posts',
    handler: require('./actions/fetch-all')
  });

  hapi.route({
    method: 'POST',
    path: '/api/posts',
    config: {
      handler: require('./actions/post'),
      validate: {
        payload: Joi.object({
          post: Joi.string().required(),
          published: Joi.boolean()
        })
      },
      auth: 'session'
    }
  });

  hapi.route({
    method: 'GET',
    path: '/api/posts/{postId}',
    config: {
      handler: require('./actions/fetch'),
      validate: {
        params: Joi.object({
          postId: Joi.string().guid()
        })
      }
    }
  });

  hapi.route({
    method: 'PUT',
    path: '/api/posts/{postId}',
    config: {
      handler: require('./actions/update'),
      validate: {
        params: Joi.object({
          postId: Joi.string().guid()
        }),
        payload: Joi.object({
          post: Joi.string(),
          published: Joi.boolean()
        }).unknown()
      },
      auth: 'session'
    }
  });

  hapi.route({
    method: 'DELETE',
    path: '/api/posts/{postId}',
    config: {
      handler: require('./actions/delete'),
      validate: {
        params: Joi.object({
          postId: Joi.string().guid()
        })
      },
      auth: 'session'
    }
  });
};
