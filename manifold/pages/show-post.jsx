import React from 'react';
import fluxApp from 'fluxapp';
import {Row, Col} from 'react-bootstrap';
import PostPreview from 'manifold/components/post-preview';
import Layout from 'manifold/components/layout';

export default React.createClass({
  displayName: 'ShowPost',

  mixins: [ fluxApp.mixins.component ],

  statics: {
    load(route, context) {
      return context.getActions('posts').get(route.params.id);
    }
  },

  getInitialState() {
    return {
      post: {}
    };
  },

  flux: {
    stores: {
      onRouteChange: 'router',
      showPost: 'post',
    }
  },

  onRouteChange() {
    const currentRoute = this.context.flux.getRouterStore().state;

    if (currentRoute.params.id) {
      this.getActions('posts').get(currentRoute.params.id);
    }
  },

  componentWillMount() {
    this.showPost();
  },

  showPost() {
    const post = this.getStore('post').state;
    this.setState({ post });
  },

  render() {
    const {post} = this.state;

    return (
      <Layout>
        <PostPreview title={post.title} body={post.post} />
      </Layout>
    );
  }
});
