import fluxApp from 'fluxapp';
import api from 'iso-fetch';
import R from 'ramda';

export default fluxApp.createActions('posts', {
  getAll: () => api.request({ url: '/api/posts' }),

  create(payload) {
    return api.request({
      url: '/api/posts',
      method: 'POST',
      payload
    });
  },

  update(data) {
    const {id} = data;
    const payload = R.omit([ 'id' ], data);

    return api.request({
      url: '/api/posts/' + id,
      method: 'PUT',
      payload
    });
  }
});
