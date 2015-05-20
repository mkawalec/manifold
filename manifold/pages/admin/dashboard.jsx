import React from 'react';
import fluxApp from 'fluxapp';
import Promise from 'bluebird';

import {Row, Col, Button} from 'react-bootstrap';
import PostsList from 'manifold/components/posts-list';
const {AdminLayout} = require('config/client');
import Preview from 'manifold/components/preview';
import RequireLogin from 'manifold/mixins/require-login';

const STYLE = {
  wrapper: {
    height: '100%'
  },
  column: {
    height: 'calc(100% - 5px)',
    marginTop: '5px'
  },
  previewColumn: {
    height: '100%'
  },
  addBtn: {
    width: '100%',
    marginTop: '5px'
  }
};

export default React.createClass({
  displayName: 'dashboard',

  mixins: [ fluxApp.mixins.component, RequireLogin ],

  statics: {
    load(route, context) {
      return RequireLogin.applyAuth(context).then(
        () => context.getActions('posts').getAll()
      );
    }
  },

  render() {
    return (
      <AdminLayout>
        <Col md={6} style={STYLE.column}>
          <PostsList/>
          <Button
            bsStyle='success'
            onClick={() => this.context.flux.getRouterActions().go('add-post')}
            style={STYLE.addBtn}
            >
              Add Post
          </Button>
        </Col>

        <Col md={6} style={STYLE.previewColumn}>
          <Preview />
        </Col>

      </AdminLayout>
    );
  }
});
