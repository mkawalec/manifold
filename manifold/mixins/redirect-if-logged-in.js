import fluxApp from 'fluxapp';

export default (redirectTo) => {
  return {
    applyAuth(context) {
      return context.getActions('session').get().then(() => {
        const session = context.getStore('session').state;
        if (session && session.username) {
          throw context.getRouterActions().go(redirectTo);
        }
      });
    },

    componentDidMount() {
      return this.applyAuth(this.context.flux);
    }
  };
};
