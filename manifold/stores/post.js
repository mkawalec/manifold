import fluxApp from 'fluxapp';

export default fluxApp.createStore('post', {
  actions: {
    onUpdate: [ 'posts.create', 'posts.update' ]
  },

  onUpdate(post) {
    this.setState(post);
  },

  getInitialState() {
    return {};
  },
});
