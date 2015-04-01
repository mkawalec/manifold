import React from 'react';
import {Row, Col} from 'react-bootstrap';
import R from 'ramda';
import fluxApp from 'fluxapp';

import Post from 'manifold/components/posts-list/post';

const STYLE = {
  wrapper: {
    border: '2px solid #000',
  }
};

export default React.createClass({
  mixins: [ fluxApp.mixins.component ],

  displayName: 'postsList',

  getInitialState() {
    return {
      posts: []
    };
  },

  flux: {
    stores: {
      postsUpdated: 'posts'
    }
  },

  postsUpdated() {
    const {posts} = fluxApp.getStore('posts').state;
    this.setState({ posts });
  },

  componentWillMount() {
    this.postsUpdated();
  },

  render() {
    const posts = R.map(post => <Post post={post}/>, this.state.posts);

    return (
      <Row style={STYLE.wrapper}>
        <Col md={12}>
          <h1>All posts</h1>
        </Col>

        <Col md={12}>
          {posts}
        </Col>
      </Row>
    );
  }
});
