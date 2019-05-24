import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
import swal from 'sweetalert';

const moment = require('moment');

class InstructorScheduleRow extends Component {
  state = {
    classStatus: '',
    checked: false,
    classBackground: '',
    id: '',
  };

  checkedClass =(idValue) => {
    this.setState({
      classStatus: 'Approved',
      checked: true,
      classBackground: 'green',
      id: idValue,
    });
  }

  declinedClass = (idValue) => {
    swal('Please tell us why you cannot instruct this class:', {
      content: 'input',
    })
      .then((value) => {
        swal(`Your reason is: ${value}`);
        this.props.dispatch({ type: 'REVIEWED_CLASS', payload: [value, this.state.id] });
        this.setState({
          classStatus: 'Denied',
          checked: true,
          classBackground: 'red',
          id: idValue,
        });
      });
  }

  render() {
    return (
      <Table.Row bgcolor={this.state.classBackground}>
        <Table.Cell>
          {this.props.schedule.class_name}
          <br />
                    Start Date:
          {moment(this.props.schedule.start_date).subtract(10, 'days').calendar()}
          <br />
                    End Date:
          {moment(this.props.schedule.end_date).subtract(10, 'days').calendar()}
        </Table.Cell>
        <Table.Cell>
          {this.props.schedule.day_of_week}
          <br />
                    Start Time:
          {this.props.schedule.start_time}
          <br />
                    End Time:
          {this.props.schedule.end_time}
        </Table.Cell>
        <Table.Cell>
                    Pay: $
          {this.props.schedule.instructor_pay}
                    /hr
          <br />
                    Class Room:
          {this.props.schedule.classroom_number}
          <br />
                    Building:
          {this.props.schedule.building}
        </Table.Cell>
        {this.state.checked
          ? (
            <Table.Cell>
              {this.state.classStatus}
            </Table.Cell>
          )
          : (
            <Table.Cell>
              <Button size="large" icon={{ color: 'green', name: 'checkmark' }} onClick={this.checkedClass(this.props.schedule.id)} />
              <Button size="large" icon={{ color: 'red', name: 'close' }} onClick={this.declinedClass(this.props.schedule.id)} />
            </Table.Cell>
          )
        }
      </Table.Row>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(InstructorScheduleRow));
