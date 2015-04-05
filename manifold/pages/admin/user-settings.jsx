import React from 'react';
import fluxApp from 'fluxapp';
import {Input, Col} from 'react-bootstrap';

const Router = fluxApp.getRouter();

import AdminLayout from 'manifold/components/admin-layout';

const PASS_OPTS = {
  type: 'password',
  labelClassName: 'col-md-4',
  wrapperClassName: 'col-md-8',
};

export default React.createClass({
  displayName: 'userSettings',

  mixins: [ fluxApp.mixins.component ],

  static: {
    load(route, fluxApp) {
      return fluxApp.getActions('session').get();
    }
  },

  getRefValue(ref) {
    return this.refs[ref].getDOMNode().value;
  },

  changePass() {
    const oldPass = this.getRefValue('oldPass');


  },

  render() {
    return (
      <AdminLayout>
        <Col md={4} mdOffset={4}>
          <h1>Change Password</h1>
          <form
            className='form-horizontal'
            onSubmit={this.changePass}
          >
            <Input {...PASS_OPTS}
                   ref='oldPass'
                   label='Old password'
            />
            <Input {...PASS_OPTS}
                   ref='newPass'
                   label='New password'
            />
            <Input {...PASS_OPTS}
                   ref='newPassRepeated'
                   label='Repeat new password'
            />

            <Input type='submit' value='Change password' />
          </form>
        </Col>
      </AdminLayout>
    );
  }
});
