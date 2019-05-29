import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table, Menu, Icon,
} from 'semantic-ui-react';
import CurrentSessionTableRow from '../CurrentSessionTableRow/CurrentSessionTableRow';
import './CurrentSession.css';

class CurrentSession extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_CURRENT_SESSIONS' });
  }

  render() {
    return (
      <div className="CurrentSession-table-container">
        <br />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Select</Table.HeaderCell>
              <Table.HeaderCell>Instructor Name</Table.HeaderCell>
              <Table.HeaderCell>Instructor Email</Table.HeaderCell>
              <Table.HeaderCell>Course Name</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Day of the Week</Table.HeaderCell>
              <Table.HeaderCell>Start Time</Table.HeaderCell>
              <Table.HeaderCell>End Time</Table.HeaderCell>
              <Table.HeaderCell>Num. of instances</Table.HeaderCell>
              <Table.HeaderCell>Course Rate</Table.HeaderCell>
              <Table.HeaderCell>Instructor Rate</Table.HeaderCell>
              <Table.HeaderCell>Course Description</Table.HeaderCell>
              <Table.HeaderCell>Course Status</Table.HeaderCell>
              <Table.HeaderCell>Edit Course</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.reduxState.currentSessionReducer
              .map(classes => <CurrentSessionTableRow classes={classes} key={classes.id} />)}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(CurrentSession));
