import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import swal from 'sweetalert';

const emptyForm = {
  instructor_name: '',
  instructor_email: '',
  phone_number: '',
};

// for auto-fill on click of button
const addBrian = {
  instructor_name: 'Brian Zilka',
  instructor_email: 'brianzilka321@gmail.com',
  phone_number: '6517732654',
};

class AddNewInstructor extends Component {
  state= {
    instructor_name: '',
    instructor_email: '',
    phone_number: '',
  }

  // updates state as for gets updated
  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // adds instructor to DB by sending state to addInstructorSaga.js
  addInstructor = (event) => {
    event.preventDefault();
    const action = { type: 'ADD_INSTRUCTOR', payload: this.state };
    this.props.dispatch(action);
    this.setState({
      ...emptyForm,
    });
    // Sends alert to DOM that instructor has been added
    swal('The new instructor has been added!');
  }

  // Auto fill to add Brian
  handleAutoFillBrian = () => {
    this.setState({
      ...addBrian,
    });
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleAutoFillBrian}>Add New Instructor</h1>
        <Form>
          <Form.Input value={this.state.instructor_name} label="Instructor's Name" placeholder="Instructor's Name" onChange={this.handleChange('instructor_name')} />
          <Form.Input value={this.state.phone_number} label="Phone Number" placeholder="Phone number" onChange={this.handleChange('phone_number')} />
          <Form.Input value={this.state.instructor_email} label="Email Address" placeholder="Email Address" onChange={this.handleChange('instructor_email')} />
          <Button type="submit" onClick={this.addInstructor}>Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(AddNewInstructor));
