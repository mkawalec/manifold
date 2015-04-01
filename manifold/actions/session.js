import fluxApp from 'fluxapp';
import api from 'iso-fetch';
import R from 'ramda';

function decodeSession() {
  const hasSession = R.find(cookie => R.trim(cookie.split('=')[0]) === 'session',
                            document.cookie.split(';'));

  if (hasSession) {
    const session = hasSession.split('=')[1];
    const decoded = (new Buffer(session, 'base64')).toString('binary');

    return JSON.parse(decoded);
  } else {
    return {};
  }
};

type LoginDetails = {
  username: string;
  password: string
};

export default fluxApp.createActions('session', {
  login(payload: LoginDetails) {
    return api.request({
      url: '/login',
      method: 'POST',
      payload: payload
    });
  },

  get() {
    if (typeof document !== 'undefined') {
      return decodeSession();
    } else {
      return api.request({
        url: '/session'
      });
    }
  }

});
