import fluxApp from 'fluxapp';

export default fluxApp.registerStore('user-update', {
  actions: {
    onUpdate: 'user.update'
  },

  getInitialState() {
    return {
      updated: []
    };
  },

  onUpdate(user) {
    console.log('got update', user);
    let {updated} = this.state;
    const newUpdated = updated.concat([ user.id ]);

    this.setState({ updated: newUpdated });
  }
});
