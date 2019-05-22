import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Instructor extends Component {
  addInstructor = (event) => {
    console.log('hello');
    console.log('event:', event);
    this.props.history.push('/add-new-instructor')
  }

  componentDidMount(){
    this.props.dispatch({type: 'GET_INSTRUCTORS'});
  }

  render() {
    return (
      <div>
        <h1>Create Instructor Table!!!!</h1>
        <button type="button" onClick={this.addInstructor}>Add New Instructor</button>
        <pre>{JSON.stringify(this.props.reduxState.instructor)}</pre>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(Instructor));
