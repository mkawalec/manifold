import pluginManager from 'app/plugins';

export default pluginManager.registerStore('session', {
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
