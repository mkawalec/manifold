import React from 'react';
import Alerts from 'manifold/components/alerts';

const STYLE = {
  height: '100%'
};

export default React.createClass({
  render() {
    return (
      <div className='container-fluid' style={STYLE}>
        <Alerts/>
        { this.props.children }
      </div>
    );
  }
});
