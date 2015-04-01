import fluxApp from 'fluxapp';
import R from 'ramda';

export default fluxApp.createActions('draft', {
  update: R.identity
});
