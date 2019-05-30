import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';

class InstructorParse extends Component {
  // state = {
  //   code: '',
  //   state: '',
  // }

  parseUrl = () => {
    const url = new URLSearchParams(window.location.hash.substr(1));
    const token = url.get('access_token');
    console.log(token);

    // axios({
    //   url: `http://localhost:5000/api/instructor/login/callback#access_token=${token}`,
    //   method: 'GET',
    // }).then((response) => {
    //   console.log(response);
    // }).catch((error) => {
    //   console.log(error);
    // });
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
