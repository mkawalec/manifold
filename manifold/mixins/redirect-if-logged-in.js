import fluxApp from 'fluxapp';
import React from 'react';

export default (redirectTo) => {
  return {
    contextTypes: {
      flux: React.PropTypes.object.isRequired
    },

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
