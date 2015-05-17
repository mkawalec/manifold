import fluxApp from 'fluxapp';
import R from 'ramda';

export default fluxApp.registerActions('posts', {
  getAll() {
    return this.context.fetcher({ url: '/api/posts' });
  },

  get(id) {
    return this.context.fetcher({ url: '/api/posts/' + id });
  },

  delete: (id) => {
    return this.context.fetcher({
      url: '/api/posts/' + id,
      method: 'DELETE'
    });
  },

  create(payload) {
    return this.context.fetcher({
      url: '/api/posts',
      method: 'POST',
      payload
    });
  },

  update(data) {
    const {id} = data;
    const payload = R.omit([ 'id' ], data);

    return this.context.fetcher({
      url: '/api/posts/' + id,
      method: 'PUT',
      payload
    });
  },
});
