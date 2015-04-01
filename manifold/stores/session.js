/*eslint-disable no-undef */
import fluxApp from 'fluxapp';
import {Buffer} from 'buffer/';

export default fluxApp.createStore('session', {
  actions: {
    setSession: 'session.get',
    onLogin: 'session.login'
  },

  onLogin() {
    this.setState({});
  },

  setSession(session) {
    this.setState(session);
  },

  getInitialState() {
    return {};
  },
})
