import React from 'react';
import {Col, Button} from 'react-bootstrap';
import fluxApp from 'fluxapp';
import R from 'ramda';

const STYLE = {
  wrapper: {
    border: '1px solid #ccc',
    padding: '3px',
    marginBottom: '5px',
    cursor: 'pointer'
  }
};

export default React.createClass({
  displayName: 'post',

  propTypes: {
    post: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func,
    style: React.PropTypes.object
  },

  wordCount() {
    return this.props.post.post.split(/\s+/).length;
  },

  edit(e) {
    e.stopPropagation();
    fluxApp.getRouter().go('/admin/add-post/' + this.props.post.id);
  },

  delete(e) {
    e.stopPropagation();
    fluxApp.getActions('posts').delete(this.props.post.id);
  },

  showPreview() {
    fluxApp.getActions('posts').get(this.props.post.id)
      .then(() => {
        const {post} = fluxApp.getStore('post').state;
        fluxApp.getActions('draft').update(post);
      });

    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  render() {
    const {post} = this.props;
    const authors = `${ post.authors.length } authors`;
    const words = `${ this.wordCount() } words`;

    return (
      <Col md={12} style={R.merge(STYLE.wrapper, this.props.style)} onClick={this.showPreview}>
        <Col md={12}><h4>{ post.title }</h4></Col>
        <Col md={4}>{ authors }</Col>
        <Col md={4}>{ words }</Col>
        <Col md={4}>
          <Button block onClick={this.edit} bsStyle='primary'>Edit</Button>
          <Button block onClick={this.delete} bsStyle='danger'>Delete</Button>
        </Col>
      </Col>
    );
  }
});
