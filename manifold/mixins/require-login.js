import fluxApp from 'fluxapp';

export default {
  applyAuth(context) {
    return context.getActions('session').get().then(() => {
      const session = context.getStore('session').state;
      if (!session || !session.username) {
        throw context.getRouterActions().go('/login');
      }
    });
  },

  componentDidMount() {
    return this.applyAuth(this.context.flux);
  }
};
