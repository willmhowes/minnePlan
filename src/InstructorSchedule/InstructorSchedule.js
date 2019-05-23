import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Icon } from 'semantic-ui-react';

const moment = require('moment');

class Instructor extends Component {
  state = {
    approvedCount: 0,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_INSTRUCTOR_SCHEDULE' });
    this.props.dispatch({ type: 'GET_CLASS_COUNT' });
  }

  checkedClass =() => {
    // console.log('checked clicked');
    const count = this.state.approvedCount;
    const newCount = count + 1;
    // console.log('adding approved count', newCount);
    this.setState({
      approvedCount: newCount,
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.reduxState.classCount.map(count => count.instructor_name)}</h1>
        <pre>{JSON.stringify(this.state)}</pre>
        <Table size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Classes</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.reduxState.instructorSchedule
              .map(schedule => (
                <Table.Row key={schedule.id}>
                  <Table.Cell>
                    {schedule.class_name}
                    <br />
                    Start Date:
                    {moment(schedule.start_date).subtract(10, 'days').calendar()}
                    <br />
                    End Date:
                    {moment(schedule.end_date).subtract(10, 'days').calendar()}
                  </Table.Cell>
                  <Table.Cell>
                    {schedule.day_of_week}
                    <br />
                    Start Time:
                    {schedule.start_time}
                    <br />
                    End Time:
                    {schedule.end_time}
                  </Table.Cell>
                  <Table.Cell>
                    Pay: $
                    {schedule.instructor_pay}
                    /hr
                    <br />
                    Class Room:
                    {schedule.classroom_number}
                    <br />
                    Building:
                    {schedule.building}
                  </Table.Cell>
                  <Table.Cell>
                    <Icon name="checkmark" size="large" onClick={this.checkedClass} />
                    <Icon name="close" size="large" />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>
                Total Classes:
                {this.props.reduxState.classCount.map(count => count.count)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                Approved:
                {this.state.approvedCount}
              </Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(Instructor));
