import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddNewClass.css';
import {
  Button, Form, TextArea, Input, Select,
} from 'semantic-ui-react';
import {
  DateInput,
  TimeInput,
} from 'semantic-ui-calendar-react';

class AddNewClass extends Component {
  state = {
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  };

  handleChange = (event, { name, value }) => {
    if (Object.prototype.hasOwnProperty.call(this.state, 'name')) {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <div>
        <Form className="NewClass">
          <Form.Group widths="equal">
            <Form.Field control={Input} label="Class Name" />
            <Form.Field control={Input} label="Season" />
            <Form.Field control={Input} label="Year" />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field control={Select} label="Instructor Name" />
            <Form.Field control={Input} label="Instructor Email" />
          </Form.Group>
          <Form.Group grouped>
            <label id="dayOfWeek">Day of Week</label>
            <Form.Field label="Monday" control="input" type="checkbox" />
            <Form.Field label="Tuesday" control="input" type="checkbox" />
            <Form.Field label="Wednesday" control="input" type="checkbox" />
            <Form.Field label="Thursday" control="input" type="checkbox" />
            <Form.Field label="Friday" control="input" type="checkbox" />
            <Form.Field label="Saturday" control="input" type="checkbox" />
          </Form.Group>
          <Form.Group widths="inline">
            <DateInput
              name="Start Date"
              placeholder="Start Date"
              value={this.state.startDate}
              iconPosition="left"
              onChange={this.handleChange}
            />
            <DateInput
              name="End Date"
              placeholder="End Date"
              value={this.state.endDate}
              iconPosition="left"
              onChange={this.handleChange}
            />
            <TimeInput
              name="Start Time"
              placeholder="Start Time"
              value={this.state.startTime}
              iconPosition="left"
              onChange={this.handleChange}
            />
            <TimeInput
              name="End Time"
              placeholder="End Time"
              value={this.state.endTime}
              iconPosition="left"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="inline">
            <Form.Field control={Input} label="Class Cost" />
            <Form.Field control={Input} label="Instructor Salary" />
          </Form.Group>
          <Form.Field control={TextArea} label="Course Description" />
          <Form.Field control={Button}>Create</Form.Field>
        </Form>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(AddNewClass));
