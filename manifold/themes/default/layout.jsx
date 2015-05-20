import React from 'react';
import immutable from 'seamless-immutable';

const STYLE = immutable({
  marginTop: '30px'
});

export default React.createClass({
  render() {
    return (
      <div className='container' style={STYLE}>
        { this.props.children }
      </div>
    );
  }
});
