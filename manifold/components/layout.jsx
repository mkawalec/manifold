import React from 'react';
import Immutable from 'immutable';

const STYLE = Immutable.fromJS({
  marginTop: '30px'
});

export default React.createClass({
  render() {
    return (
      <div className='container' style={STYLE.toJS()}>
        { this.props.children }
      </div>
    );
  }
});
