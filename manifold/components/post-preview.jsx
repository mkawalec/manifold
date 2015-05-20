import React from 'react';
import fluxApp from 'fluxapp';
import {Link} from 'fluxapp-router/components/';

import {Col, Row} from 'react-bootstrap';
import Preview from 'manifold/components/preview';

const STYLE = {
  header: {
    fontSize: '45px',
    fontWeight: 600
  }
};

export default React.createClass({
  displayName: 'postPreview',

  propTypes: {
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired,
    id: React.PropTypes.string,
    showMore: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      showMore: false
    };
  },

  process(body) {
    if (! this.props.showMore) {
      return body;
    } else {
      const split = body.split(/([\?!\.])/, 12);
      return split.join('');
    }
  },

  render() {
    const params = { id: this.props.id };

    const title = this.props.showMore ? (
      <Link to='show-post' meta={{ params }}>
        <h1 style={STYLE.header}>{ this.props.title }</h1>
      </Link>
    ) : (
        <h1 style={STYLE.header}>{ this.props.title }</h1>
    );

    const moreLink = this.props.showMore ? (
      <Link to='show-post' meta={{ params }}>Show more...</Link>
    ) : void(0);

    return (
      <Row>
        <Col md={12}>
          {title}
        </Col>
        <Col md={12}>
          <Preview post={this.process(this.props.body)}/>
          {moreLink}
        </Col>
      </Row>
    );
  }
});
