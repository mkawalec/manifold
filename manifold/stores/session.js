import fluxApp from 'fluxapp';

export default fluxApp.registerStore('session', {
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
