import React from 'react';
import R from 'ramda';
import fluxApp from 'fluxapp';

const STYLE = {
  wrapper: {
    width: '140px',
    minHeight: '80px',
    padding: '5px',
    fontSize: '1.2em',
    lineHeight: '1.25em',
    marginBottom: '10px',
    cursor: 'pointer'
  },
  info: { backgroundColor: '#99f' },
  error: { backgroundColor: '#f99' },
  success: { backgroundColor: '#9f9' },
};

export default React.createClass({
  displayName: 'alert',

  mixins: [ fluxApp.mixins.component ],

  propTypes: {
    alert: React.PropTypes.object.isRequired
  },

  dismiss() {
    this.getActions('alerts').remove(this.props.alert.id);
  },

  getInitialState() {
    return {};
  },

  componentDidMount() {
    const timeout = this.props.alert.timeout || 2000;
    const timeoutHandle = setTimeout(() => {
      fluxApp.getActions('alerts').remove(this.props.alert.id);
    }, timeout);

    this.setState({ timeoutHandle });
  },

  componentWillUnmount() {
    if (this.state.timeoutHandle) {
      clearTimeout(this.state.timeoutHandle);
    }
  },

  render() {
    const {alert} = this.props;
    const style = R.merge(STYLE.wrapper, STYLE[alert.type]);

    return (
      <div style={style} onClick={this.dismiss}>
        {alert.message}
      </div>
    );
  },
});
