import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as withRouter} from 'react-router-dom';

class Instructor extends Component {

  addInstructor = (event) => {
    this.props.history.push('/addnewinstructor')
  }

  render(){
    return (
      <div>
        <h1>Create Instructor Table!!!!</h1>
        <button onClick={this.addInstructor}>Add New Instructor</button>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(Instructor));
