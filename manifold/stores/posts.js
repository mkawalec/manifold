import fluxApp from 'fluxapp';

console.log('posts included');
export default fluxApp.registerStore('posts', {
  actions: {
    onGetAll: 'posts.getAll'
  },

  getInitialState() {
    console.log('getting initial state of posts');
    return {
      posts: []
    };
  },

  onGetAll(posts) {
    console.log('getting all posts', posts);
    this.setState({ posts });
  }
});
