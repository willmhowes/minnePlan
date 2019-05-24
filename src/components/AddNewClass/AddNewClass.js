import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddNewClass.css';
import {
  Button, Form, TextArea, Input, Select, Segment, Header,
} from 'semantic-ui-react';
import {
  DateInput,
  TimeInput,
} from 'semantic-ui-calendar-react';
// import moment from 'moment';
import 'moment/locale/ru';

class AddNewClass extends Component {
  state = {
    session: '',
    className: '',
    day: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    studentCost: '',
    instructorPay: '',
    description: '',
    instructorRef: '',
    instructorEmail: '',
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_SESSIONS' });
    this.props.dispatch({ type: 'GET_INSTRUCTORS' });
  }

  handleChange = (event, { name, value }) => {
    if (Object.prototype.hasOwnProperty.call(this.state, 'name')) {
      this.setState({ [name]: value });
    }
  }

  handleNewSession = (event, { value, name }) => {
    // console.log(value, name);
    // console.log(this.state);
    this.setState({
      [name]: value,
    });
  }

  handleNewChange = name => (event) => {
    // console.log(event.target.value, name);
    // console.log(this.state);
    this.setState({
      [name]: event.target.value,
    });
  };

  handleInstructor = (event, { value }) => {
    this.setState({
      instructorRef: value,
    });
    this.props.dispatch({ type: 'GET_INSTRUCTOR', payload: value });
  }

  handleDay = (event) => {
    const { day: currentDay } = this.state;
    this.setState({
      day: currentDay + event.target.value,
    });
  }

  render() {
    return (
      <div className="AddNewClass-Segment_div">
        <pre>{JSON.stringify(this.state.instructorEmail)}</pre>
        <Header as="h1" attached="top">Add New Class</Header>
        <Segment attached>
          <Form className="NewClass">
            <Form.Group widths="inline">
              <Form.Field control={Input} label="Class Name" onChange={this.handleNewChange('className')} />
              <Form.Field
                control={Select}
                label="Session"
                name="session"
                options={this.props.reduxState.session.map(session => ({
                  key: session.id,
                  text: session.season + session.year,
                  value: session.id,
                }))}
                onChange={this.handleNewSession}
              />
            </Form.Group>
            <Form.Group widths="inline">
              <Form.Dropdown
                placeholder="Select Instructor"
                fluid
                search
                selection
                label="Select Instructor"
                options={this.props.reduxState.instructor
                  .map(instructor => ({
                    key: instructor.id,
                    text: instructor.instructor_name,
                    value: instructor.id,
                    defaultValue: instructor.instructor_email,
                  }))}
                widths="inline"
                onChange={this.handleInstructor}
              />
              <Form.Field control={Input} label="Instructor Email" defaultValue={this.state.instructorEmail} onChange={this.handleNewChange('instructorEmail')} />
            </Form.Group>
            <Form.Group grouped>
              <h2>Day of Week</h2>
              <Form.Field label="Monday" control="input" type="checkbox" value="Monday" onClick={this.handleDay} />
              <Form.Field label="Tuesday" control="input" type="checkbox" value="Tuesday" onClick={this.handleDay} />
              <Form.Field label="Wednesday" control="input" type="checkbox" value="Wednesday" onClick={this.handleDay} />
              <Form.Field label="Thursday" control="input" type="checkbox" value="Thursday" onClick={this.handleDay} />
              <Form.Field label="Friday" control="input" type="checkbox" value="Friday" onClick={this.handleDay} />
              <Form.Field label="Saturday" control="input" type="checkbox" value="Saturday" onClick={this.handleDay} />
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
              <Form.Field control={Input} label="Class Cost" onChange={this.handleNewChange('studentCost')} />
              <Form.Field control={Input} label="Instructor Salary" onChange={this.handleNewChange('instructorPay')} />
            </Form.Group>
            <Form.Group widths="inline">
              <Form.Field control={TextArea} label="Course Description" onChange={this.handleNewChange('description')} />
            </Form.Group>
            <Form.Field control={Button}>Create</Form.Field>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(AddNewClass));
