import fluxApp from 'fluxapp';
import api from 'iso-fetch';

export default fluxApp.createActions('session', {
  login(payload) {
    return api.request({ 
      url: '/login', 
      method: 'POST',
      payload: payload
    });
  },
});
