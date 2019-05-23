import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Table, Button } from 'semantic-ui-react';

class Instructor extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_INSTRUCTOR_SCHEDULE' });
  }

  render() {
    return (
      <div>
        <h1>Instructors Schedule</h1>
        <pre>{JSON.stringify(this.props.reduxState.instructorSchedule)}</pre>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(Instructor));
