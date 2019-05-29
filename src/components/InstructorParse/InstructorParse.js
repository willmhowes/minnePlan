import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class InstructorParse extends Component {
  // state = {
  //   code: '',
  //   state: '',
  // }

  parseUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    axios({
      url: `/api/instructor/login/callback?code=${code}&state=${state}`,
      method: 'GET',
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidMount = () => {
    this.parseUrl();
  }

  render() {
    return (
      <div>
        <h1>This is the parsing page</h1>
        {/* {JSON.stringify(this.state)} */}
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(InstructorParse));
