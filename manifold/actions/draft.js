import fluxApp from 'fluxapp';
import R from 'ramda';

export default fluxApp.registerActions('draft', {
  update: R.identity,

  setPreview: R.identity
});
