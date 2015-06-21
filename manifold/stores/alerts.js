import uuid from 'uuid';
import R from 'ramda';
import fluxApp from 'fluxapp';

export default fluxApp.registerStore('alerts', {
  actions: {
    onAdd: 'alerts.add',
    onRemove: 'alerts.remove'
  },

  getInitialState() {
    return {
      alerts: []
    };
  },

  onRemove(id) {
    const alerts = R.reject(el => el.id === id,
      this.state.alerts);

    this.setState({ alerts });
  },

  onAdd(toAdd) {
    let alerts = this.state.alerts.asMutable();

    toAdd = R.clone(toAdd);
    toAdd.id = uuid.v4();

    alerts.push(toAdd);
    this.setState({ alerts });
  }
});
