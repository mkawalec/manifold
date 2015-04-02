import React from 'react';
import {Col, Button} from 'react-bootstrap';
import fluxApp from 'fluxapp';

const STYLE = {
  wrapper: {
    border: '1px solid #ccc',
    padding: '3px',
    marginBottom: '5px'
  }
};

export default React.createClass({
  displayName: 'post',

  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  wordCount() {
    return this.props.post.post.split(/\s+/).length;
  },

  edit() {
    fluxApp.getRouter().go('/admin/add-post/' + this.props.post.id);
  },

  render() {
    const {post} = this.props;
    const authors = `${ post.authors.length } authors`;
    const words = `${ this.wordCount() } words`;

    return (
      <Col md={12} style={STYLE.wrapper}>
        <Col md={12}><h4>{ post.title }</h4></Col>
        <Col md={4}>{ authors }</Col>
        <Col md={4}>{ words }</Col>
        <Col md={4}>
          <Button onClick={this.edit} bsStyle='primary'>Edit</Button>
        </Col>
      </Col>
    );
  }
});
