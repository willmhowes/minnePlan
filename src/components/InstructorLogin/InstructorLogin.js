import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Segment, Header, Form } from 'semantic-ui-react';
import auth0 from 'auth0-js';

const webAuth = new auth0.WebAuth({
  clientID: 'V54yGoqSS6zr4Gi38q4xh1Fw1kZhNQvQ',
  domain: 'dev-o06mn1qr.auth0.com',
  redirectUri: 'http://localhost:5000/api/instructor/login/callback',
  responseType: 'token id_token',
  scope: 'openid email',
});

class InstructorLogin extends Component {
  state = {
    email: '',
    code: '',
    codeIsSent: false,
  }

  handleInputChangeFor = (event) => {
    const name = event.target.getAttribute('name');
    const { value } = event.target;
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
        alert(`error sending email: ${err.error_description}`);
      }
      this.setState({
        codeIsSent: true,
      });
    });
  }

  verifyCode = () => {
    const { email, code } = this.state;
    webAuth.passwordlessLogin({
      connection: 'email',
      email,
      verificationCode: code,
    }, (err) => {
      console.error(err);
      // handle errors
    });
  }

  // Takes arguements of properties for Form.Input component
  renderFormInput = (label, type, name, value) => {
    // if error message exists, renders input with 'error' property
    // TODO: render errors
    if (false) {
      return (
        <Form.Input
          error
          label={label}
          type={type}
          name={name}
          value={value}
          placeholder={label}
          onChange={this.handleInputChangeFor}
        />
      );
    // else, renders standard input field
    }
    return (
      <Form.Input
        label={label}
        type={type}
        name={name}
        value={value}
        placeholder={label}
        onChange={this.handleInputChangeFor}
      />
    );
  }

  render() {
    return (
      <div className="LoginPage-form">
        {!this.state.codeIsSent ? (
          <Segment>
            <Header as="h1" className="LoginPage-header">Enter email to recieve temporary password</Header>
            <Form onSubmit={this.sendEmail}>
              {this.renderFormInput('Email', 'text', 'email', this.state.email)}
              <Form.Button
                primary
                fluid
                type="submit"
                name="submit"
              >
              Submit
              </Form.Button>
            </Form>
          </Segment>
        ) : (
          <Segment>
            <Header as="h1" className="LoginPage-header">Enter code found in email to log in</Header>
            <Form onSubmit={this.verifyCode}>
              {this.renderFormInput('Code', 'text', 'code', this.state.code)}
              <Form.Button
                primary
                fluid
                type="submit"
                name="submit"
              >
              Log In
              </Form.Button>
            </Form>
          </Segment>
        )}
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(InstructorLogin));
