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
      onRouteChange: 'router',
    }
  },

  statics: {
    load(route, context) {
      return RequireLogin.applyAuth(context);
    },
    willTransitionTo() {
      return true;
    }
  },

  onRouteChange() {
    const currentRoute = this.context.flux.getRouterStore().state;
    if (currentRoute) {
      this.setState({
        postId: currentRoute.params.id
      });
    }
  },

  componentDidMount() {
    const currentRoute = this.context.flux.getRouterStore().state;
    const postId = currentRoute.params.id;
    if (postId) {
      this.getActions('posts').get(postId);
      this.onRouteChange();
    }
  },

  getInitialState() {
    return {
      title: '',
      post: '',
    };
  },

  onFail(action, error) {
    this.getActions('alerts').add({
      message: 'Saving failed. Try again in a moment',
      type: 'error',
      timeout: 10000,
    });
  },

  onPostUpdated() {
    const post = this.getStore('post').state;

    if (post.id !== this.state.postId) {
      this.setState({ postId: post.id });
      const params = { id: post.id };

      this.context.flux.getRouterActions().go(
        'add-post', { params });

      this.getActions('alerts').add({
        message: 'Document saved successfully',
        type: 'success',
        timeout: 1200,
      });
    } else {
      this.setState(post);
    }
  },

  updateStore: _.debounce(function() {
    this.getActions('draft').update(this.state.post);
  }, 200),

  addPost() {
    const payload = R.pick([ 'post', 'title' ], this.state);

    if (this.state.postId) {
      this.getActions('posts').update(R.merge({
        id: this.state.postId
      }, payload));
    } else {
      this.getActions('posts').create(payload);
    }
  },

  updateInput(fieldName, e) {
    this.setState({ [fieldName]: e.target.value });
  },

  render() {
    return (
      <AdminLayout>
        <Col md={12}>
          <input
            type='text'
            style={STYLE.title}
            value={this.state.title}
            onChange={this.updateInput.bind(this, 'title')}
           />
        </Col>
        <Col md={6} style={STYLE.col}>
          <textarea
            value={this.state.post}
            onChange={R.compose(this.updateStore, this.updateInput.bind(this, 'post'))}
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
