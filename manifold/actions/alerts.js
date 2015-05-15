import fluxApp from 'fluxapp';
import R from 'ramda';

export default fluxApp.registerActions('alerts', {
  add: R.identity,

  remove: R.identity
});
