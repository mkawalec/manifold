import React from 'react';
import fluxApp from 'fluxapp';
import R from 'ramda';
import uuid from 'uuid';
import Promise from 'bluebird';

import {Col, form, Input, Button} from 'react-bootstrap';
import Layout from 'manifold/components/layout';
import Errors from 'manifold/components/errors';

const router = fluxApp.getRouter();

function makeError(msg) {
  return {
    id: uuid.v4(),
    msg: msg
  };
}

const isSessionActive = (fluxapp) => {
  return fluxapp.getActions('session').get().then(() => {
    const session = fluxapp.getStore('session').state;
    if (session && session.username) {
      const router = fluxapp.getRouter ? fluxapp.getRouter() : fluxApp.getRouter();
      return router.go('/');
    }
  });
};

export default React.createClass({
  mixins: [ fluxApp.mixins.component ],

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
      return isSessionActive(fluxApp);
    }
  },

  componentWillMount() {
    return isSessionActive(this);
  },

  onLoginFail(fail, error) {
    let {errors} = this.state;

    if (error.message === 'Unauthorized') {
      errors.push(makeError('Your password is incorrect'));
    } else if (error.message === 'Not Found') {
      errors.push(makeError('The username is not found'));
    } else if (error.message === 'Bad Request') {
      errors.push(makeError(
        'Username or password contains illegal characters or is too short'));
    }

    this.setState({ errors });
  },

  getInitialState() {
    return {
      errors: []
    };
  },

  isSessionActive() {
    return isSessionActive(this);
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
        <Col xs={4} xsOffset={4}>
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
