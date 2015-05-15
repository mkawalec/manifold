import fluxApp from 'fluxapp';

export default fluxApp.registerStore('draft', {
  actions: {
    onUpdate: 'draft.update'
  },

  onUpdate(body) {
    this.setState({ body });
  },

  getInitialState() {
    return {
      body: ''
    };
  },
});
