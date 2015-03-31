import React from 'react';
import R from 'ramda';
import {Alert, Row} from 'react-bootstrap';
import uuid from 'uuid';

export default React.createClass({
  propTypes: {
    errors: React.PropTypes.array.isRequired,
    onDismiss: React.PropTypes.func.isRequired
  },

  render() {
    console.log('haz errors', this.props.errors);
    const errors = R.map(error => {
      error.id = uuid.v4();
      const dimiss = R.partial(this.props.onDismiss, error.id);

      return (
        <Alert bsStyle='danger' onDismiss={dismiss}>
          <p>{error.msg}</p>
        </Alert>
      );
    }, this.props.errors);

    return (
      <Row>
        {errors}
      </Row>
    );
  }
});
