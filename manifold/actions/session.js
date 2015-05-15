/* global document */
import fluxApp from 'fluxapp';
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
}

export default fluxApp.registerActions('session', {
  login(payload) {
    return this.context.fetcher({
      url: '/login',
      method: 'POST',
      payload: payload
    });
  },

  get() {
    if (typeof document !== 'undefined') {
      return decodeSession();
    } else {
      return this.context.fetcher({ url: '/session' });
    }
  }

});
