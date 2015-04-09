import React from 'react';
import fluxApp from 'fluxapp';
import {Input, Col} from 'react-bootstrap';
import uuid from 'uuid';
import R from 'ramda';

const Router = fluxApp.getRouter();

import AdminLayout from 'manifold/components/admin-layout';
import RequireLogin from 'manifold/mixins/require-login';
import Errors from 'manifold/components/errors';

const PASS_OPTS = {
  type: 'password',
  labelClassName: 'col-md-4',
  wrapperClassName: 'col-md-8',
};

function makeError(msg, style) {
  return {
    id: uuid.v4(),
    style: style,
    msg
  };
}

export default React.createClass({
  displayName: 'userSettings',

  mixins: [ fluxApp.mixins.component, RequireLogin ],

  static: {
    load(route, fluxApp) {
      return RequireLogin.applyAuth(fluxApp);
    }
  },

  flux: {
    stores: {
      onUpdate: 'user-update'
    },
    actions: {
      onUpdateFailed: 'user.update:failed'
    }
  },

  getInitialState() {
    return {
      passErrors: [],
      oldPass: '',
      newPass: '',
      newPassRepeated: ''
    };
  },

  onUpdate() {
    let {passErrors} = this.state;
    passErrors = [ makeError('Update successful', 'success') ];

    this.setState({ 
      passErrors,
      oldPass: '',
      newPass: '',
      newPassRepeated: ''
    });
  },

  onUpdateFailed(action, e) {
    let {passErrors} = this.state;
    passErrors.push(makeError(e.message));

    this.setState({ passErrors });
  },

  getRefValue(ref) {
    return this.refs[ref].getDOMNode().value;
  },

  changePass(e) {
    e.preventDefault();
    const {oldPass, newPass, newPassRepeated, passErrors} = this.state;

    if (newPass !== newPassRepeated) {
      passErrors.push(makeError('The passwords are different'));
      return this.setState({ passErrors });
    }

    fluxApp.getActions('session').get().spread((action, session) => {
      fluxApp.getActions('user').update({
        id: session.id,
        password: newPass,
        oldPassword: oldPass
      });
    });
  },

  dismiss(errorContainer) {
    return (errorId) => {
      const errors = R.reject(error => error.id === errorId, this.state[errorContainer]);
      this.setState({
        [errorContainer]: errors
      });
    };
  },

  update(updateWhat) {
    return (e) => {
      this.setState({
        [updateWhat]: e.target.value
      });
    };
  },

  render() {
    return (
      <AdminLayout>
        <Col md={4} mdOffset={4}>
          <h1>Change Password</h1>
          <Errors errors={this.state.passErrors} onDismiss={this.dismiss('passErrors')} />
          <form
            className='form-horizontal'
            onSubmit={this.changePass}
          >
            <Input {...PASS_OPTS}
                   label='Old password'
                   value={this.state.oldPass}
                   onChange={this.update('oldPass')}
            />
            <Input {...PASS_OPTS}
                   label='New password'
                   value={this.state.newPass}
                   onChange={this.update('newPass')}
            />
            <Input {...PASS_OPTS}
                   label='Repeat new password'
                   value={this.state.newPassRepeated}
                   onChange={this.update('newPassRepeated')}
            />

            <Input type='submit' value='Change password' />
          </form>
        </Col>
      </AdminLayout>
    );
  }
});
