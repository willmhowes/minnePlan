import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Table, Button } from 'semantic-ui-react'
import './Instructor.css'
import InstructorRow from './InstructorRow';

class Instructor extends Component {

  addInstructor = () => {
    console.log('Add new instructor button clicked')
    this.props.history.push('/add-new-instructor')
  }

  componentDidMount(){
    this.props.dispatch({type: 'GET_INSTRUCTORS'});
  }

  render() {
    return (
      <div>
        <h1>All Instructors</h1>
        <Button onClick={this.addInstructor}>Add New Instructor</Button>
        {/* <pre>{JSON.stringify(this.props.reduxState.instructor)}</pre> */}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Instructor Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone Number</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.reduxState.instructor.map(instructor =>
              <InstructorRow instructor={instructor} />
              )}
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
