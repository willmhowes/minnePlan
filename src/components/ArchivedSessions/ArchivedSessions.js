import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ArchivedSessions extends Component {
  render() {
    return (
      <div>
        <h1>Create History/Archived Table!!!!</h1>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(ArchivedSessions));
