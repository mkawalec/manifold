import React from 'react';
import {Row, Col} from 'react-bootstrap';
import R from 'ramda';
import fluxApp from 'fluxapp';

import Post from 'manifold/components/posts-list/post';

const STYLE = {
  wrapper: {
    border: '2px solid #000',
    overflow: 'auto',
    height: 'calc(100% - 50px)',
  },
  selected: {
    backgroundColor: '#9f9'
  }
};

export default React.createClass({
  mixins: [ fluxApp.mixins.component ],

  displayName: 'postsList',

  getInitialState() {
    return {
      posts: [],
      selectedPost: -1
    };
  },

  flux: {
    stores: {
      postsUpdated: 'posts',
      postUpdated: 'post'
    }
  },

  postUpdated() {
    fluxApp.getActions('posts').getAll();
  },

  postsUpdated() {
    const {posts} = fluxApp.getStore('posts').state;
    this.setState({ posts });
  },

  componentWillMount() {
    if (fluxApp.getStore('posts').state.posts.length === 0) {
      fluxApp.getActions('posts').getAll();
    } else {
      this.postsUpdated();
    }
  },

  selectPost(selectedPost) {
    return () => {
      this.setState({ selectedPost });
    };
  },

  render() {
    const posts = R.map(post => {
      return (
        <Post
          onClick={this.selectPost(post.id)}
          post={post}
          key={post.id}
          style={post.id === this.state.selectedPost ? STYLE.selected : null}
        />
      );
    }, this.state.posts);

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
