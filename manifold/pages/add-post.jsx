import React from 'react';
import fluxApp from 'fluxapp';
import {Col, Input, Button} from 'react-bootstrap';
import _ from 'lodash';
import R from 'ramda';

import AdminLayout from 'manifold/components/admin-layout';
import Preview from 'manifold/components/preview';

const STYLE = {
  col: {
    height: 'calc(100% - 64px)',
  },
  postInput: {
    height: 'calc(100% - 40px)',
    width: '100%',
    resize: 'none'
  },
  addBtn: {
    width: '100%'
  },
  title: {
    width: '100%',
    fontSize: '40px',
    lineHeight: '40px',
    marginBottom: '5px',
    marginTop: '5px',
  },
};

export default React.createClass({
  displayName: 'addPost',

  mixins: [ fluxApp.mixins.component ],

  flux: {
    actions: {
      onFail: [ 'posts.create:failed' ]
    },
    stores: {
      onPostUpdated: 'post'
    }
  },

  getInitialState() {
    return {};
  },

  onFail(action, error) {
    console.error('saving failed', error);
  },

  onPostUpdated() {
    const post = fluxApp.getStore('post').state;
    this.setState({
      postId: post.id
    });
  },

  updateStore: _.debounce(function() {
    const {value} = this.refs.post.getDOMNode();
    fluxApp.getActions('draft').update(value);
  }, 200),

  addPost() {
    const payload = {
      post: this.refs.post.getDOMNode().value,
      title: this.refs.title.getDOMNode().value,
    };

    if (this.state.postId) {
      fluxApp.getActions('posts').update(R.merge({
        id: this.state.postId
      }, payload));
    } else {
      fluxApp.getActions('posts').create(payload);
    }
  },

  render() {
    return (
      <AdminLayout>
        <Col md={12}>
          <input type='text' style={STYLE.title} ref='title' a/>
        </Col>
        <Col md={6} style={STYLE.col}>
          <textarea 
            ref='post' 
            onChange={this.updateStore} 
            style={STYLE.postInput} 
            />
            <Button 
              bsStyle='primary' 
              style={STYLE.addBtn}
              onClick={this.addPost}
              >
                Add post
            </Button>
        </Col>

        <Col md={6} style={STYLE.col}>
          <Preview/>
        </Col>

      </AdminLayout>
    );
  }
});
