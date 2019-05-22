import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import './Instructor.css'

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
              <Table.Row>
                <Table.Cell>{instructor.instructor_name}</Table.Cell>
                <Table.Cell>{instructor.instructor_email}</Table.Cell>
                <Table.Cell>
                  <span className="icon">{instructor.phone_number}</span>
                  <Icon name="edit"></Icon>
                </Table.Cell>
              </Table.Row>
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
