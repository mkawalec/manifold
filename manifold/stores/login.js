import fluxApp from 'fluxapp';
import R from 'ramda';
import {Buffer} from 'buffer/';

export default fluxApp.createStore('login', {
  actions: {
    onLogin: [ 'account.login', 'account.login:failed' ],
    onSessionDetails: [ 'account.getSession' ]
  },

  decodeSession() {
    const hasSession = R.find(cookie => R.trim(cookie.split('=')[0]) === 'session',
      document.cookie.split(';'));

    if (hasSession) {
      const session = hasSession.split('=')[1];

      const decoded = (new Buffer(session, 'base64')).toString('binary');
      fluxApp.getActions('account').getSession();

      return JSON.parse(decoded);
    } else {
      return {};
    }
  },

  getInitialState() {
    if (typeof document !== 'undefined') {
      return this.decodeSession();
    }
  },

  onSessionDetails(data) {
    this.setState({ session: data });
  },

  onLogin(data) {
    if (data && data.isBoom) {
      this.setState({});
    } else {
      this.setState(this.decodeSession());
    }
  }
})
