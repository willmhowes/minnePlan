import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class InstructorParse extends Component {
  componentDidMount = () => {
    window.history.replaceState(null, null, ' ');
  }

  logout = () => {
    this.props.dispatch({ type: 'LOGOUT' });
    this.props.history.push('/instructor_login');
  }

  render() {
    return (
      <div>
        <h1>This is the parsing page</h1>
        <button
          type="button"
          onClick={this.logout}
        >
          Logout
        </button>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(InstructorParse));
