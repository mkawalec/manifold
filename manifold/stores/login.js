import fluxApp from 'fluxapp';
import {Buffer} from 'buffer/';

export default fluxApp.createStore('login', {
  actions: {
    onLogin: 'session.login'
  },

  onLogin() {
    this.setState({
      loggedIn: true
    });
  },

  getInitialState() {
    return {
      loggedIn: false
    };
  },
})
