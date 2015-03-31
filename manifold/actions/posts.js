import fluxApp from 'fluxapp';
import api from 'iso-fetch';

export default fluxApp.createActions('posts', {
  getAll() {
    console.log('getall called');
    return api.request({ url: '/api/posts' });
  }
});
