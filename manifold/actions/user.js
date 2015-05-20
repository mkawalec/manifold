import fluxApp from 'fluxapp';
import R from 'ramda';

export default fluxApp.registerActions('user', {
  update(payload) {
    return this.context.fetcher({
      url: '/api/users/' + payload.id,
      method: 'PUT',
      payload: R.omit([ 'id' ], payload)
    });
  }
});
