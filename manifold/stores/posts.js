import fluxApp from 'fluxapp';

export default fluxApp.createStore('posts', {
  actions: {
    onGetAll: 'posts.getAll'
  },

  getIntialState() {
    return {
      posts: []
    };
  },

  onGetAll(posts) {
    this.setState({ posts });
  }
});
