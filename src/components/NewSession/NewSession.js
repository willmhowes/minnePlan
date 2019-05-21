import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as withRouter} from 'react-router-dom';

class NewSession extends Component {
  render(){
    return (
      <div>
        <h1>Create New Session Thing!!!!</h1>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(NewSession));
