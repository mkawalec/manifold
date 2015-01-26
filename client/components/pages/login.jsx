'use strict';

var React = require('react');
var fluxApp = require('fluxapp');
var Promise = require('bluebird');
var _ = require('lodash');
var utils = require('../../utils');
var router = require('fluxapp-router');

var Bootstrap = require('react-bootstrap');
var Col = Bootstrap.Col;
var form = Bootstrap.form;
var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var Alert = Bootstrap.Alert;


module.exports = React.createClass({
  mixins: [ fluxApp.mixins.component ],
  
  displayName: 'login',

  flux: {
    stores: {
      onLoginStore: 'login'
    }
  },

  getInitialState: function getInitialState() {
    return {
      errors: []
    };
  },

  componentWillMount: function componentWillMount() {
    var loginState = this.getStore('login').state;
    if (loginState && loginState.loggedIn) {
      router.go('/');
    }
  },

  onLogin: function onLogin(e) {
    e.preventDefault();

    var payload = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue()
    };

    this.getAction('account', 'login')(payload);
  },

  onLoginStore: function onLoginStore() {
    var loginState = this.getStore('login').state;
    if (loginState.fail) {
      var errors = this.state.errors.concat([ { 
        msg: loginState.fail,
        id: utils.genRandomString()
      } ]);

      this.setState({ errors: errors });
    } else {
      router.go('/');
    }
  },

  dismissError: function dismissError(errorId) {
    return function() {
      var newErrors = _.reject(this.state.errors, function(error) {
        return error.id === errorId;
      });

      this.setState({ errors: newErrors });
    }.bind(this);
  },

  render: function renderHomePage() {
    var validationErrors = _.map(this.state.errors, function genAlert(errorMessage) {
      return (<Alert bsStyle='danger' onDismiss={this.dismissError(errorMessage.id)}>
                <p>{errorMessage.msg}</p>
              </Alert>);
    }, this);

    return (
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
    );
  }
});
