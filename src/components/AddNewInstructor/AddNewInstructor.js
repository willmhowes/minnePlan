import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as withRouter} from 'react-router-dom';

class AddNewInstructor extends Component {
  render(){
    return (
      <div>
        <h1>Add New Instructor Form Goes Here!!!!</h1>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(AddNewInstructor));
