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

  handleChange = name => (event) => {
    // console.log(event.target.value, name);
    // console.log(this.state);
    this.setState({
      [name]: event.target.value,
    });
  };

  addInstructor = (event) => {
    event.preventDefault();
    console.log('adding instructor', this.state);
    const action = { type: 'ADD_INSTRUCTOR', payload: this.state };
    console.log(action);
    this.props.dispatch(action);
    this.setState({
      ...emptyForm,
    });
    swal('The new instructor has been added!');
  }

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
