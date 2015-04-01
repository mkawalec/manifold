import React from 'react';
import {Col} from 'react-bootstrap';

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

  render() {
    const {post} = this.props;
    const authors = `${ post.authors.length } authors`;
    const words = `${ this.wordCount() } words`;

    return (
      <Col md={12} style={STYLE.wrapper}>
        <Col md={12}><h4>{ post.title }</h4></Col>
        <Col md={4}>{ authors }</Col>
        <Col md={4}>{ words }</Col>
      </Col>
    );
  }
});
