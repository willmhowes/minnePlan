import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table, Menu, Icon, Modal, Button,
} from 'semantic-ui-react';
import FutureSessionTableRow from '../FutureSessionTableRow/FutureSessionTableRow';
import './FutureSession.css';

class FutureSession extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_CLASSES' });
    this.props.dispatch({ type: 'GET_INSTRUCTORS' });
  }

  render() {
    return (
      <div className="page-container">
        {/* <pre>{JSON.stringify(this.props.reduxState.setClassReducer)}</pre> */}
        <div className="legend">
          <h3 className="colorLegend">Color Legend</h3>
          <ul className="legendList">
            <li>
              White - Default
            </li>
            <li>
              Yellow - Pending
            </li>
            <li>
              Blue - Needs permit
            </li>
            <li>
              Orange - Needs Review
            </li>
            <li>
              Green - Ready to Transfer
            </li>
            <li>
              Red - No Instructor
            </li>
            <li>
              Grey - Transfered to Eleyo
            </li>
          </ul>
        </div>
        <div className="FutureSession-table-container">
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
              {this.props.reduxState.setClassReducer
                .map(classes => <FutureSessionTableRow classes={classes} key={classes.id} />)}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(FutureSession));
