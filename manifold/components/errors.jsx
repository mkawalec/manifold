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
    console.log('inside render');
    const errors = R.map(error => {
      const dimiss = R.partial(this.props.onDismiss, error.get('id'));

      return (
        <Alert bsStyle='danger' onDismiss={dismiss}>
          <p>{error.get('msg')}</p>
        </Alert>
      );
    }, this.props.errors);

    console.log('errors', errors);
    return (
      <Row>
        {errors}
      </Row>
    );
  }
});
