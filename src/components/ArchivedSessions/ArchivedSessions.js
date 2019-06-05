import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Checkbox, Button } from 'semantic-ui-react';
import swal from 'sweetalert';

class ArchivedSessions extends Component {
  state = {
    idArray: [],
  };

  handleSelect = (event, { value }) => {
    this.setState(prevState => ({
      idArray: [...prevState.idArray, value],
    }));
  }

  handleClick = () => {
    this.props.dispatch({ type: 'COPY_CLASS', payload: this.state.idArray });
    swal('Your class has been added to the future session!');
  }

  render() {
    return (
      <div>
        <br />
        <Button onClick={this.handleClick}>Add to Future Session</Button>
        <br />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Select</Table.HeaderCell>
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
              <Table.Row key={classroom.id}>
                <Table.Cell>
                  <Checkbox onClick={this.handleSelect} value={classroom.id} />
                </Table.Cell>
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
