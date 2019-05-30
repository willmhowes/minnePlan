import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddNewClass.css';
import {
  Form, Segment, Header,
} from 'semantic-ui-react';
import {
  DateInput,
  TimeInput,
} from 'semantic-ui-calendar-react';

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
    numInstances: '',
    classroom: '',
    building: '',
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_SESSIONS' });
    this.props.dispatch({ type: 'GET_INSTRUCTORS' });
  }

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  }

  // handleNewSession = (event, { value, name }) => {
  //   // console.log(value, name);
  //   // console.log(this.state);
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  handleNewChange = name => (event) => {
    // console.log(event.target.value, name);
    // console.log(this.state);
    this.setState({
      [name]: event.target.value,
    });
  };

  handleInstructor = (event, { value }) => {
    this.setState({
      instructorRef: this.props.reduxState.instructor[value].id,
      instructorEmail: this.props.reduxState.instructor[value].instructor_email,
    });
    // this.props.dispatch({ type: 'GET_INSTRUCTOR', payload: value });
  }

  handleDay = (event) => {
    const { day: currentDay } = this.state;
    this.setState({
      day: currentDay + event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('in handleSubmit');
    // POST new class to DB
    this.props.dispatch({ type: 'ADD_CLASS', payload: this.state });
  }

  render() {
    return (
      <div className="AddNewClass-Segment_div">
        {/* <pre>{JSON.stringify(this.state)}</pre> */}
        <Header as="h1" attached="top">Add New Class</Header>
        <Segment attached>
          <Form className="NewClass" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                label="Class Name"
                onChange={this.handleNewChange('className')}
              />
              <Form.Select
                label="Session"
                name="session"
                options={this.props.reduxState.session.map(session => ({
                  key: session.id,
                  text: session.season + session.years,
                  value: session.id,
                }))}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Number of Instances"
                onChange={this.handleNewChange('numInstances')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input label="Building" onChange={this.handleNewChange('building')} />
              <Form.Input label="Classroom" onChange={this.handleNewChange('classroom')} />
            </Form.Group>
            {/* TODO: Fix goofy label on dropdown */}
            <Form.Group>
              <Form.Dropdown
                placeholder="Select Instructor"
                fluid
                search
                selection
                label="Select Instructor"
                options={this.props.reduxState.instructor
                  .map((instructor, index) => ({
                    key: instructor.id,
                    text: instructor.instructor_name,
                    value: index,
                    defaultValue: instructor.instructor_email,
                  }))}
                onChange={this.handleInstructor}
              />
              <Form.Input label="Instructor Email" defaultValue={this.state.instructorEmail} onChange={this.handleNewChange('instructorEmail')} />
            </Form.Group>
            <Header as="h5">Day Of Week</Header>
            <Form.Group>
              <Form.Input label="Monday" type="checkbox" value="Monday" onClick={this.handleDay} />
              <Form.Input label="Tuesday" type="checkbox" value="Tuesday" onClick={this.handleDay} />
              <Form.Input label="Wednesday" type="checkbox" value="Wednesday" onClick={this.handleDay} />
              <Form.Input label="Thursday" type="checkbox" value="Thursday" onClick={this.handleDay} />
              <Form.Input label="Friday" type="checkbox" value="Friday" onClick={this.handleDay} />
              <Form.Input label="Saturday" type="checkbox" value="Saturday" onClick={this.handleDay} />
            </Form.Group>
            <Form.Group>
              <DateInput
                name="startDate"
                placeholder="Start Date"
                value={this.state.startDate}
                iconPosition="left"
                onChange={this.handleChange}
                label="Start Date"
                dateFormat="L"
              />
              <DateInput
                name="endDate"
                placeholder="End Date"
                value={this.state.endDate}
                iconPosition="left"
                onChange={this.handleChange}
                label="End Date"
                dateFormat="L"
              />
              <TimeInput
                name="startTime"
                placeholder="Start Time"
                value={this.state.startTime}
                iconPosition="left"
                onChange={this.handleChange}
                label="Start Time"
                timeFormat="AMPM"
              />
              <TimeInput
                name="endTime"
                placeholder="End Time"
                value={this.state.endTime}
                iconPosition="left"
                onChange={this.handleChange}
                label="End Time"
                timeFormat="AMPM"
              />
            </Form.Group>
            <Form.Group>
              <Form.Input label="Class Cost" onChange={this.handleNewChange('studentCost')} />
              <Form.Input label="Instructor Salary" onChange={this.handleNewChange('instructorPay')} />
            </Form.Group>
            <Form.Group>
              <Form.TextArea label="Course Description" onChange={this.handleNewChange('description')} />
            </Form.Group>
            <Form.Button type="submit">Create</Form.Button>
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
