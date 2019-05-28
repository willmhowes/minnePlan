import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

class ArchivedSessions extends Component {
  render() {
    return (
      <div>
        <h1>Create History/Archived Table!!!!</h1>
        <pre>{JSON.stringify(this.props.reduxState.archived)}</pre>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Class Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Day of The Week</Table.HeaderCell>
              <Table.HeaderCell>Instructor</Table.HeaderCell>
              <Table.HeaderCell>Instructor Pay</Table.HeaderCell>
              <Table.HeaderCell>Class Cost</Table.HeaderCell>
              <Table.HeaderCell>Material Cost</Table.HeaderCell>
              <Table.HeaderCell>Building</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.reduxState.archived.map(classroom => (
              <Table.Row>
                <Table.Cell>{classroom.class_name}</Table.Cell>
                <Table.Cell>{classroom.description}</Table.Cell>
                <Table.Cell>{classroom.day_of_week}</Table.Cell>
                <Table.Cell>{classroom.instructor_name}</Table.Cell>
                <Table.Cell>{classroom.instructor_pay}</Table.Cell>
                <Table.Cell>{classroom.student_cost}</Table.Cell>
                <Table.Cell>{classroom.materials_cost}</Table.Cell>
                <Table.Cell>{classroom.building}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(ArchivedSessions));
