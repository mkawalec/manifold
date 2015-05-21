import pluginManager from 'app/plugins';

export default pluginManager.registerStore('login', {
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
});
