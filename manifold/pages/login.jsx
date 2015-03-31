import React from 'react';
import fluxApp from 'fluxapp';
import R from 'ramda';

import {Col, form, Input, Button} from 'react-bootstrap';
import Layout from 'manifold/components/layout';
import Errors from 'manifold/components/errors';

const router = fluxApp.getRouter();

export default React.createClass({
  mixins: [ fluxApp.mixins.component ],
  
  displayName: 'login',

  flux: {
    stores: {
      isSessionActive: 'session'
    },
    actions: {
      onLoginFail: 'session.login:failed'
    }
  },

  onLoginFail(fail, error) {
    let {errors} = this.state;

    console.log('got error', error);
    if (error.message === 'Unauthorized') {
      console.log('adding error');
      errors.push({
        msg: 'Your password is incorrect'
      });
    } else if (error.message === 'Not Found') {
      errors.push({
        msg: 'The username is not found'
      });
    } else if (error.message === 'Bad Request') {
      errors.push({
        msg: 'Username or password contains illegal characters or is too short'
      });
    }

    this.setState({ errors });
  },

  getInitialState() {
    return {
      errors: []
    };
  },

  isSessionActive() {
    const session = this.getStore('session').state;
    if (session && session.username) {
      router.go('/');
    }
  },

  componentWillMount() {
    this.isSessionActive();
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
    console.log('rerendering');
    return (
      <Layout>
        <Col xs={4} xsOffset={4}>
          <Errors errors={this.state.errors} onDismiss={this.dismissError} />

          <form className='form-horizontal' onSubmit={this.onLogin} >
            <Input  type="text" 
                    ref='username' 
                    label="User Name" 
                    labelClassName="col-xs-4"  
                    wrapperClassName="col-xs-8" />

            <Input  type="password" 
                    ref='password' 
                    label="Password" 
                    labelClassName="col-xs-4" 
                    wrapperClassName="col-xs-8" />

            <Input  type='submit'
                    value='Login!'
                    />

           </form>
        </Col>
      </Layout>
    );
  }
});
