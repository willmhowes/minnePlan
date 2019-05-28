import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import auth0 from 'auth0-js';

const { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_CALLBACK_URL } = process.env;

const webAuth = new auth0.WebAuth({
  clientID: AUTH0_CLIENT_ID || 'V54yGoqSS6zr4Gi38q4xh1Fw1kZhNQvQ',
  domain: AUTH0_DOMAIN || 'dev-o06mn1qr.auth0.com',
  redirectUri: AUTH0_CALLBACK_URL || 'http://localhost:3000/#/instructor_login',
  responseType: 'code',
  scope: 'openid profile',
});

class InstructorLogin extends Component {
  state = {
    email: '',
    code: '',
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  sendEmail = () => {
    const { email } = this.state;

    webAuth.passwordlessStart({
      connection: 'email',
      send: 'code',
      email,
    }, (err) => {
      if (err) {
        // eslint-disable-next-line no-alert
        alert(`error sending email: ${err.error_description}`);
      }
    });
  }

  verifyCode = () => {
    const { email, code } = this.state;
    webAuth.passwordlessLogin({
      connection: 'email',
      email,
      verificationCode: code,
    }, (err) => {
      // handle errors
      console.error(err);
    });
  }

  render() {
    return (
      <div>
        <input
          name="email"
          placeholder="email"
          onChange={this.onChange}
          value={this.state.email}
        />
        <button
          type="button"
          onClick={this.sendEmail}
        >
          SendEmail
        </button>

        <br />

        <input
          name="code"
          placeholder="code"
          onChange={this.onChange}
          value={this.state.code}
        />
        <button
          type="button"
          onClick={this.verifyCode}
        >
          VerifyCode
        </button>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(InstructorLogin));
