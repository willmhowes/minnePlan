import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class InstructorParse extends Component {
  componentDidMount = () => {
    window.history.replaceState(null, null, ' ');
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
