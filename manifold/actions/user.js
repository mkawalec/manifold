import fluxApp from 'fluxapp';
import R from 'ramda';

export default fluxApp.registerActions('user', {
  update(payload) {
    return fluxApp.fetch({
      url: '/api/users/' + payload.id,
      method: 'PUT',
      payload: R.omit([ 'id' ], payload)
    });
  }
});
