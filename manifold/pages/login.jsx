import React from 'react';
import fluxApp from 'fluxapp';
import R from 'ramda';
import uuid from 'uuid';

import {Col, form, Input, Button, Alert} from 'react-bootstrap';
import Layout from 'manifold/components/layout';

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
        id: uuid.v4(),
        msg: 'Your password is incorrect'
      });
    } else if (error.message === 'Not Found') {
      errors.push({
        id: uuid.v4(),
        msg: 'The username is not found'
      });
    } else if (error.message === 'Bad Request') {
      errors.push({
        id: uuid.v4(),
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
    return function() {
      const errors = R.reject(error => error.id === errorId, this.state.errors);
      this.setState({ errors });
    }.bind(this);
  },

  render: function renderHomePage() {
    const validationErrors = R.map(message => {
      console.log('showing errors', message);
      return (
        <Alert bsStyle='danger' onDismiss={this.dismissError(errorMessage.id)}>
          <p>{message.msg}</p>
        </Alert>
      );
    }, this.state.errors);

    return (
      <Layout>
        <Col xs={4} xsOffset={4}>
          
          {validationErrors}

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
