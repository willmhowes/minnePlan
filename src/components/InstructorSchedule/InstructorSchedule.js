import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
// import swal from 'sweetalert';
import InstructorScheduleRow from './InstructorScheduleRow';

// const moment = require('moment');

class InstructorSchedule extends Component {
  componentDidMount() {
    window.history.replaceState(null, null, ' ');
    this.props.dispatch({ type: 'GET_INSTRUCTOR_SCHEDULE' });
    this.props.dispatch({ type: 'GET_CLASS_COUNT' });
  }

  logout = () => {
    this.props.dispatch({ type: 'LOGOUT' });
    this.props.history.push('/instructor_login');
  }

  render() {
    return (
      <div>
        <h1 align="center">
          {' '}
          Hello,
          {' '}
          {this.props.reduxState.classCount.map(count => count.instructor_name)}
        </h1>
        <p align="center">
          {' '}
          Below you will find your classes for the upcoming session in
          {' '}
          {this.props.reduxState.classCount.map(seasons => seasons.season)}
          {' '}
          {this.props.reduxState.classCount.map(seasons => seasons.years)}
          .
        </p>
        <p align="center">
          {' '}
          If the information for a class looks correct please click the
          {' '}
          <Button size="small" icon={{ color: 'green', name: 'checkmark' }} disabled />
          {' '}
        </p>
        <p align="center">
          {' '}
          If the information is incorrect in some way please click the
          {' '}
          <Button size="small" icon={{ color: 'red', name: 'close' }} disabled />
          {' '}
          and give a breif explanation as to why.
        </p>
        <p align="center"> Once you are done please logout.</p>
        {/* <pre>{JSON.stringify(this.state)}</pre> */}
        <Table size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Classes</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.reduxState.instructorSchedule
              .map(schedule => (
                <InstructorScheduleRow schedule={schedule} checkedClass={this.checkedClass} />
              ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>
                Total Classes:
                {this.props.reduxState.classCount.map(count => count.count)}
              </Table.HeaderCell>
              <Table.HeaderCell>
              </Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <Button
          type="button"
          onClick={this.logout}
        >
          Logout
        </Button>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(InstructorSchedule));
