import fluxApp from 'fluxapp';

export default fluxApp.createStore('post', {
  actions: {
    onUpdate: [ 'posts.create', 'posts.update', 'posts.get' ]
  },

  onUpdate(post) {
    this.replaceState(post);
  },

  getInitialState() {
    return {};
  },
});
