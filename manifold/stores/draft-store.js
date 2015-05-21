import pluginManager from 'app/plugins';

export default pluginManager.registerStore('draft', {
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
