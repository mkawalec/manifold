import React from 'react';
import fluxApp from 'fluxapp';
import {Col, Input} from 'react-bootstrap';
import _ from 'lodash';

import AdminLayout from 'manifold/components/admin-layout';
import Preview from 'manifold/components/preview';

const STYLE = {
  col: {
    height: '100%'
  },
  postInput: {
    height: '100%',
    width: '100%'
  }
};

export default React.createClass({
  displayName: 'addPost',

  updateStore: _.debounce(function() {
    const {value} = this.refs.post.getDOMNode();
    fluxApp.getActions('draft').update(value);
  }, 200),

  render() {
    return (
      <AdminLayout>
        <Col md={6} style={STYLE.col}>
          <textarea 
            ref='post' 
            onChange={this.updateStore} 
            style={STYLE.postInput} 
            />
        </Col>

        <Col md={6} style={STYLE.col}>
          <Preview/>
        </Col>

      </AdminLayout>
    );
  }
});
