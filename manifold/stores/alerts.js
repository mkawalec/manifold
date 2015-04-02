import fluxApp from 'fluxapp';
import uuid from 'uuid';
import R from 'ramda';

type Alert = {
  message: string;
  type: string;
  timeout: any
};

export default fluxApp.createStore('alerts', {
  actions: {
    onAdd: 'alerts.add',
    onRemove: 'alerts.remove'
  },

  getInitialState() {
    return {
      alerts: []
    }
  },

  onRemove(id: string) {
    const alerts = R.reject(el => el.id === id,
      this.state.alerts);

    this.setState({ alerts });
  },

  onAdd(toAdd: Alert) {
    const {alerts} = this.state;
    toAdd = R.clone(toAdd);
    toAdd.id = uuid.v4();

    alerts.push(toAdd);
    this.setState({ alerts });
  }
});
