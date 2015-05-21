import pluginManager from 'app/plugins';

export default pluginManager.registerStore('posts', {
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
