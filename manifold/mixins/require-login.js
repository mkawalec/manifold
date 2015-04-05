import fluxApp from 'fluxapp';

export default {
  applyAuth(fluxInterface) {
    return fluxInterface.getActions('session').get().then(() => {
      const session = fluxInterface.getStore('session').state;
      if (!session || !session.username) {
        const router = fluxInterface.getRouter ? 
          fluxInterface.getRouter() : fluxApp.getRouter();
        throw router.go('/login');
      }
    });
  },

  componentWillMount() {
    return this.applyAuth(this);
  }
};
