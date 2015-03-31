import React from 'react';
import fluxApp from 'fluxapp';
import Layout from 'manifold/components/layout';

import {Col} from 'react-bootstrap';

export default React.createClass({
  mixins: [ fluxApp.mixins.component ],

  displayName: 'home',

  statics: {
    load: function loadComponent(route, fluxApp) {
      var postActions = fluxApp.getActions('posts');
      return postActions.getAll();
    }
  },

  getInitialState() {
    return {
      posts : []
    };
  },

  componentWillMount() {
    const postsStore = fluxApp.getStore('posts');
    this.setState({
      posts: postsStore.state.all
    });
  },

  render: function renderHomePage() {
    return (
      <Layout>
        <Col>
          Hi, this is a home page
        </Col>
      </Layout>
    );
  }
});
