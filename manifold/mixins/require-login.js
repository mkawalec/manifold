import fluxApp from 'fluxapp';

export default {
  applyAuth(fluxInterface) {
    return fluxInterface.getActions('session').get().then(() => {
      const session = fluxInterface.getStore('session').state;
      if (!session || !session.username) {
        if (fluxInterface.getRouter) {
          throw fluxInterface.getRouter().go('/login');
        } else {
          return fluxApp.getRouter().go('/login');
        }
      }
    });
  },

  componentWillMount() {
    return this.applyAuth(this);
  }
};
