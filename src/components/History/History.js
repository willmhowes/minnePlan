import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as withRouter} from 'react-router-dom';

class History extends Component {
  render(){
    return (
      <div>
        <h1>Create History/Archived Table!!!!</h1>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(History));
