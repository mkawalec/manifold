import fluxApp from 'fluxapp';
import api from 'iso-fetch';

export default fluxApp.createActions('posts', {
  getAll() {
    return api.request({ url: '/api/posts' });
  }
});
