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
import swal from 'sweetalert';

const emptyForm = {
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
  materialsCost: '',
};

class AddNewClass extends Component {
  state = {
    session: '',
    className: '',
    day: '',
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    studentCost: null,
    instructorPay: null,
    description: '',
    instructorRef: '',
    instructorEmail: '',
    numInstances: null,
    classroom: '',
    building: '',
    materialsCost: null,
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
    this.setState({
      ...emptyForm,
    });
    swal('Your class has been added to the future session!');
  }

  // showCreate = dimmer => () => this.setState({ dimmer, createOpen: true });

  // close = () => {
  //   this.setState({ createOpen: false });
  // }

  // closeCreate = (event) => {
  //   event.preventDefault();
  //   this.setState({ createOpen: false });
  //   const action = { type: 'ADD_CLASS', payload: this.state };
  //   console.log('adding class', action);
  //   this.props.dispatch(action);
  // }

  render() {
    // const { createOpen, dimmer } = this.state;
    return (
      <div className="AddNewClass-Segment_div">
        {/* <pre>{JSON.stringify(this.state)}</pre> */}
        <Header className="addClassHeader" as="h1" attached="top">Add New Class</Header>
        <Segment attached>
          <Form className="NewClass" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                value={this.state.className}
                label="Class Name"
                onChange={this.handleNewChange('className')}
              />
              <Form.Select
                value={this.state.session}
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
                value={this.state.numInstances}
                label="Number of Instances"
                onChange={this.handleNewChange('numInstances')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input value={this.state.building} label="Building" onChange={this.handleNewChange('building')} />
              <Form.Input value={this.state.classroom} label="Classroom" onChange={this.handleNewChange('classroom')} />
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
              <Form.Input value={this.state.studentCost}  label="Class Cost" onChange={this.handleNewChange('studentCost')} />
              <Form.Input value={this.state.instructorPay}  label="Instructor Salary" onChange={this.handleNewChange('instructorPay')} />
              <Form.Input value={this.state.materialsCost}  label="Materials Cost" onChange={this.handleNewChange('materialsCost')} />
            </Form.Group>
            <Form.Group>
              <Form.TextArea value={this.state.description} label="Course Description" onChange={this.handleNewChange('description')} />
            </Form.Group>
            {/* <Button onClick={this.showCreate(true)} positive>Create</Button>
            <Modal dimmer={dimmer} open={createOpen} onClose={this.close}>
              <Modal.Header>Add Class</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <p>
                    Are you sure you want to add
                    {' '}
                    {this.state.className}
                    {' '}
                    for
                    {' '}
                    {this.state.session}
                  </p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color="black" onClick={this.close}>
                  Do not add class
                </Button>
                <Button
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  content="Add class"
                  onClick={this.closeCreate}
                />
              </Modal.Actions>
            </Modal> */}
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
