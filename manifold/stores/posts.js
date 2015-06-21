import fluxApp from 'fluxapp';

export default fluxApp.registerStore('posts', {
  actions: {
    onGetAll: 'posts.getAll'
  },

  getInitialState() {
    return {
      posts: []
    };
  },

  onGetAll(posts) {
    this.setState({ posts });
  }
});
