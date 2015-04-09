import React from 'react';
import fluxApp from 'fluxapp';
import R from 'ramda';
import uuid from 'uuid';
import Promise from 'bluebird';

import {Col, form, Input, Button} from 'react-bootstrap';
import Layout from 'manifold/components/layout';
import Errors from 'manifold/components/errors';

import RedirectIfLoggedIn from 'manifold/mixins/redirect-if-logged-in';
const redirectMixin = RedirectIfLoggedIn('/admin/dashboard');

function makeError(msg) {
  return {
    id: uuid.v4(),
    msg: msg
  };
}

export default React.createClass({
  mixins: [ fluxApp.mixins.component, redirectMixin ],

  displayName: 'login',

  flux: {
    stores: {
      isSessionActive: 'login'
    },
    actions: {
      onLoginFail: 'session.login:failed'
    }
  },

  statics: {
    load(route, fluxApp) {
      return redirectMixin.applyAuth(fluxApp);
    }
  },

  onLoginFail(fail, error) {
    this.setState({ 
      errors: [ makeError(error.message) ]
    });
  },

  getInitialState() {
    return {
      errors: []
    };
  },

  isSessionActive() {
    return redirectMixin.applyAuth(this);
  },

  onLogin(e) {
    e.preventDefault();

    var payload = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue()
    };

    this.getAction('session', 'login')(payload);
  },

  dismissError: function dismissError(errorId) {
    const errors = R.reject(error => error.id === errorId, this.state.errors);
    this.setState({ errors });
  },

  render: function renderHomePage() {
    return (
      <Layout>
        <Col md={4} mdOffset={4}>
          <Errors errors={this.state.errors} onDismiss={this.dismissError} />

          <form 
            className='form-horizontal' 
            onSubmit={this.onLogin} 
            action='/login' 
            method='post'
            >
              <Input type="text"
                     ref='username'
                     name='username'
                     label="User Name"
                     labelClassName="col-xs-4"
                     wrapperClassName="col-xs-8" />

              <Input type="password"
                     ref='password'
                     label="Password"
                     name='password'
                     labelClassName="col-xs-4"
                     wrapperClassName="col-xs-8" />

              <Input type='submit'
                     value='Login!'
                     />
           </form>
        </Col>
      </Layout>
    );
  }
});
