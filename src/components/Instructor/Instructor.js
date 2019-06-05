import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
import './Instructor.css';
import InstructorRow from './InstructorRow';

class Instructor extends Component {
  // sends dispatch to setInstructorSaga.js, to update instructor reducer
  componentDidMount() {
    this.props.dispatch({ type: 'GET_INSTRUCTORS' });
  }

  // redirects user to add new instructor page
  addInstructor = () => {
    this.props.history.push('/add-new-instructor');
  }

  render() {
    return (
      <div>
        <h1>All Instructors</h1>
        <Button onClick={this.addInstructor}>Add New Instructor</Button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Instructor Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone Number</Table.HeaderCell>
              <Table.HeaderCell>{'\u00A0'}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.reduxState.instructor
              .map(instructor => <InstructorRow instructor={instructor} key={instructor.id} />)}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(Instructor));
