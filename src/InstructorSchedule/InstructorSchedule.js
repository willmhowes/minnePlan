import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Icon } from 'semantic-ui-react';

class Instructor extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_INSTRUCTOR_SCHEDULE' });
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.reduxState.instructorSchedule)}</pre>
        <Table size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Classes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.reduxState.instructorSchedule
              .map(schedule => (
                <Table.Row>
                  <Table.Cell>
                    {schedule.class_name}
                    <br />
                    Start Date:
                    {schedule.start_date}
                    <br />
                    End Date:
                    {schedule.end_date}
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
                    <Icon name="checkmark" size="large" />
                    <Icon name="close" size="large" />
                  </Table.Cell>
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

export default connect(mapReduxStateToProps)(withRouter(Instructor));
