import fluxApp from 'fluxapp';
import R from 'ramda';

export default fluxApp.createActions('alerts', {
  add: R.identity
});
