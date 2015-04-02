import fluxApp from 'fluxapp';

export default fluxApp.createStore('post', {
  actions: {
    onUpdate: [ 'posts.create', 'posts.update', 'posts.get', 'draft.setPreview' ],
    onDelete: 'posts.delete'
  },

  onUpdate(post) {
    this.replaceState(post);
  },

  onDelete(deleted) {
    this.replaceState({ deleted: deleted.id });
  },

  getInitialState() {
    return {};
  },
});
