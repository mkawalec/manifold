import React from 'react';
import fluxApp from 'fluxapp';
import R from 'ramda';

import Alert from 'manifold/components/alerts/alert';

const STYLE = {
  position: 'fixed',
  right: '50px',
  bottom: '10px',
  display: 'flex',
  flexDirection: 'column-reverse',
  zIndex: '10'
};

export default React.createClass({
  displayName: 'Alerts',

  mixins: [ fluxApp.mixins.component ],

  flux: {
    stores: {
      onAlertsChange: 'alerts'
    }
  },

  getInitialState() {
    return {
      alerts: []
    };
  },

  onAlertsChange() {
    const {alerts} = this.getStore('alerts').state;
    this.setState({ alerts });
  },

  render() {
    const alerts = R.map(alert => <Alert key={alert.id} alert={alert} />, this.state.alerts);

    return (
      <div style={STYLE}>
        {alerts}
      </div>
    );
  }
});
