import React from 'react';

const STYLE = {
  height: '100%'
};

export default React.createClass({
  render() {
    return (
      <div className='container-fluid' style={STYLE}>
        { this.props.children }
      </div>
    );
  }
});
