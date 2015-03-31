import fluxApp from 'fluxapp';

export default fluxApp.createStore('posts', {
  actions: {
    onGetAll: 'posts.getAll'
  },

  getIntialState() {
    return {
      all: [],
      individual: {}
    };
  },      

  onGetAll(data) {
    this.setState({ all: data });
  }
});
