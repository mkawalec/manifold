import fluxApp from 'fluxapp';

export default (redirectTo) => {
  return {
    applyAuth(fluxInterface) {
      return fluxInterface.getActions('session').get().then(() => {
        const session = fluxInterface.getStore('session').state;
        if (session && session.username) {
          if (fluxInterface.getRouter) {
            throw fluxInterface.getRouter().go(redirectTo);
          } else {
            return fluxApp.getRouter().go(redirectTo);
          }
        }
      });
    },

    componentWillMount() {
      return this.applyAuth(this);
    }
  };
};
