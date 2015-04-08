import React from 'react';
import fluxApp from 'fluxapp';
import {Row, Col} from 'react-bootstrap';
import PostPreview from 'manifold/components/post-preview';
import Layout from 'manifold/components/layout';

export default React.createClass({
  displayName: 'ShowPost',

  mixins: [ fluxApp.mixins.component ],

  statics: {
    load(route, fluxApp) {
      return fluxApp.getActions('posts').get(route.params.id)
    }
  },

  getInitialState() {
    return {
      post: {}
    };
  },

  flux: {
    stores: {
      onRouteChange: fluxApp.getRouter().getStore().id,
      showPost: 'post',
    }
  },

  onRouteChange() {
    const currentRoute = fluxApp.getRouter().getStore().state.current;

    if (currentRoute.route.params.id) {
      fluxApp.getActions('posts').get(currentRoute.route.params.id);
    }
  },

  componentWillMount() {
    this.showPost();
  },

  showPost() {
    const post = fluxApp.getStore('post').state;
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
