import fluxApp from 'fluxapp';
import api from 'iso-fetch';

export default fluxApp.createActions('account', {
  login(payload) {
    return api.request({ 
      url: '/login', 
      method: 'POST',
      payload: payload
    });
  },
});
