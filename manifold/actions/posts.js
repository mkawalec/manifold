import fluxApp from 'fluxapp';
import R from 'ramda';

export default fluxApp.registerActions('posts', {
  getAll: () => fluxApp.fetch({ url: '/api/posts' }),

  get: (id) => fluxApp.fetch({ url: '/api/posts/' + id }),

  delete: (id) => {
    return fluxApp.fetch({
      url: '/api/posts/' + id,
      method: 'DELETE'
    });
  },

  create(payload) {
    return fluxApp.fetch({
      url: '/api/posts',
      method: 'POST',
      payload
    });
  },

  update(data) {
    const {id} = data;
    const payload = R.omit([ 'id' ], data);

    return fluxApp.fetch({
      url: '/api/posts/' + id,
      method: 'PUT',
      payload
    });
  },
});
