import React from 'react';
import fluxApp from 'fluxapp';
import R from 'ramda';

import Layout from 'manifold/components/layout';
import Preview from 'manifold/components/preview';
import PostPreview from 'manifold/components/post-preview';

import {Row, Col} from 'react-bootstrap';

export default React.createClass({
  mixins: [ fluxApp.mixins.component ],

  displayName: 'home',

  statics: {
    load: function loadComponent(route, fluxApp) {
      return fluxApp.getActions('posts').getAll();
    }
  },

  getInitialState() {
    return {
      posts : []
    };
  },

  componentWillMount() {
    const posts = this.getStore('posts').state.posts;
    if (posts) {
      this.setState({ posts });
    }
  },

  render: function renderHomePage() {
    const posts = R.map(post => {
      return (
        <PostPreview
          showMore={true}
          title={post.title}
          body={post.post}
          key={post.id}
          id={post.id}
          />
      );
    }, this.state.posts);

    return (
      <Layout>
        {posts}
      </Layout>
    );
  }
});
