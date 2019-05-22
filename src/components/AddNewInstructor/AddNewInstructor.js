import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'

class AddNewInstructor extends Component {

  state= {
    instructor_name: '',
    instructor_email: '',
    phone_number: ''
  }

  handleChange = name => event => {
    //console.log(event.target.value, name);
    // console.log(this.state);
    this.setState({
      [name]: event.target.value,
    });
  };

  addInstructor = (event) => {
    event.preventDefault();
    console.log('adding instructor', this.state);
    let action = {type: 'ADD_INSTRUCTOR', payload: this.state};
    console.log(action);
    this.props.dispatch(action);
  }


  render() {
    return (
      <div>
        <h1>Add New Instructor Form Goes Here!!!!</h1>
        <Form>
          <Form.Field>
            <label>Instructor's Name</label>
            <input placeholder="Instructor's Name" onChange={this.handleChange('instructor_name')}/>
          </Form.Field>
          <Form.Field>
            <label>Phone Number</label>
            <input placeholder='Phone number' onChange={this.handleChange('phone_number')}/>
           </Form.Field>
           <Form.Field>
            <label>Email Address</label>
            <input placeholder='Email Address' onChange={this.handleChange('instructor_email')}/>
           </Form.Field>
          <Button type='submit' onClick={this.addInstructor}>Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(AddNewInstructor));
