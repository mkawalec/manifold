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
    let {updated} = this.state;
    updated.push(user.id);

    this.setState({ updated });
  }
});
