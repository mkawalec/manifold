import React from 'react';
import fluxApp from 'fluxapp';
import {Col, Input, Button} from 'react-bootstrap';
import _ from 'lodash';
import R from 'ramda';

import AdminLayout from 'manifold/components/admin-layout';
import Preview from 'manifold/components/preview';
import RequireLogin from 'manifold/mixins/require-login';

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

  mixins: [ fluxApp.mixins.component, RequireLogin ],

  flux: {
    actions: {
      onFail: [ 'posts.create:failed' ]
    },
    stores: {
      onPostUpdated: 'post',
      onRouteChange: fluxApp.getRouter().getStore().id
    }
  },

  statics: {
    load(route, fluxApp) {
      return RequireLogin.applyAuth(fluxApp);
    }
  },

  onRouteChange() {
    const currentRoute = fluxApp.getRouter().getStore().state.current;
    if (currentRoute.route) {
      this.setState({
        postId: currentRoute.route.params.id
      });
    }
  },

  componentDidMount() {
    const currentRoute = fluxApp.getRouter().getStore().state.current;
    const postId = currentRoute.route.params.id;
    if (postId) {
      fluxApp.getActions('posts').get(postId);
      this.onRouteChange();
    }
  },

  getInitialState() {
    return {};
  },

  onFail(action, error) {
    fluxApp.getActions('alerts').add({
      message: 'Saving failed. Try again in a moment',
      type: 'error',
      timeout: 10000
    });
  },

  onPostUpdated() {
    const post = fluxApp.getStore('post').state;

    if (post.post) {
      this.refs.post.getDOMNode().value = post.post;
      this.refs.title.getDOMNode().value = post.title;
      this.updateStore();
    } else {
      fluxApp.getActions('alerts').add({
        message: 'Document saved successfully',
        type: 'success',
        timeout: 1200
      });
      fluxApp.getRouter().go('/admin/add-post/' + post.id);
    }
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
          <input type='text' style={STYLE.title} ref='title' />
        </Col>
        <Col md={6} style={STYLE.col}>
          <textarea
            ref='post'
            onChange={this.updateStore}
            style={STYLE.postInput}
            />
            <Button
              bsStyle={ this.state.postId ? 'success' : 'primary'}
              style={STYLE.addBtn}
              onClick={this.addPost}
              >
                { this.state.postId ? 'Update post' : 'Add post' }
            </Button>
        </Col>

        <Col md={6} style={STYLE.col}>
          <Preview/>
        </Col>

      </AdminLayout>
    );
  }
});
