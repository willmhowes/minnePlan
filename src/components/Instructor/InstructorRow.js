import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Table, Form } from 'semantic-ui-react';
import './Instructor.css';
import swal from 'sweetalert';

class Instructor extends Component {
  state = {
    edit: false,
    instructor: {
      id: this.props.instructor.id,
      instructor_name: this.props.instructor.instructor_name,
      instructor_email: this.props.instructor.instructor_email,
      phone_number: this.props.instructor.phone_number,
    },
  }

  // changes this.state.edit to conditional render input fields
  editInstructor = () => {
    const editNow = this.state.edit;
    this.setState({
      edit: !editNow,
    });
  }

  // updates state as user types in fields
  handleChange = name => (event) => {
    this.setState({
      instructor: {
        ...this.state.instructor,
        [name]: event.target.value,
      },
    });
  };

  // flips condional render to not show input fields, sends updated information
  // to updateInstructorSaga.js
  updateInstructor = () => {
    const afterUpdate = this.state.edit;
    this.setState({
      edit: !afterUpdate,
    });
    const action = { type: 'UPDATE_INSTRUCTOR', payload: this.state.instructor };
    this.props.dispatch(action);
    swal('The instructor has been updated!');
  }

  render() {
    return (
      <>
        {this.state.edit
          ? (
            // conditional renders to edit if this.state.edit == true
            <Table.Row>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="First Name" defaultValue={this.props.instructor.instructor_name} onChange={this.handleChange('instructor_name')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="First Name" defaultValue={this.props.instructor.instructor_email} onChange={this.handleChange('instructor_email')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="First Name" defaultValue={this.props.instructor.phone_number} onChange={this.handleChange('phone_number')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Icon name="save" onClick={this.updateInstructor} />
              </Table.Cell>
            </Table.Row>
          )
          : ( // conditional renders to text if this.state.edit == false
            <Table.Row>
              <Table.Cell>{this.props.instructor.instructor_name}</Table.Cell>
              <Table.Cell>{this.props.instructor.instructor_email}</Table.Cell>
              <Table.Cell>
                <span className="icon">{this.props.instructor.phone_number}</span>
              </Table.Cell>
              <Table.Cell>
                <Icon name="edit" onClick={this.editInstructor} />
              </Table.Cell>
            </Table.Row>
          )
            }
      </>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(Instructor));
