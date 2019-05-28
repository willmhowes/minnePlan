import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table, Checkbox, Icon, Modal, Button, Form,
} from 'semantic-ui-react';
// import swal from 'sweetalert';

class FutureSessionTableRow extends Component {
  state = {
    classRow: {
      open: false,
      id: this.props.classes.id,
      // instructor_name: this.props.classes.instructor_name,
      // instructor_email: this.props.instructor.instructor_email,
      // class_name: this.props.classes.class_name,
      // start_date: this.props.classes.start_date,
      // end_date: this.props.classes.end_date,
      // day_of_week: this.props.classes.day_of_week,
      // time_of_day: this.props.classes.start_time,
      // num_of_instances: this.props.classes.numInstances,
      // student_cost: this.props.classes.student_cost,
      // instructor_pay: this.props.classes.instructor_pay,
      // description: this.props.classes.description,
      // course_status: this.props.classes.phone_number,
    },
  }

  show = dimmer => () => this.setState({ dimmer, open: true });

  close = () => this.setState({ open: false })

  handleChange = name => (event) => {
    console.log(event.target.value, name);
    console.log(this.state.classRow);
    this.setState({
      classRow: {
        // eslint-disable-next-line react/no-access-state-in-setstate
        ...this.state.classRow,
        [name]: event.target.value,
      },
    });
  };

  updateclassRow = () => {
    console.log('Updating classRow', this.state.classRow);
    const afterUpdate = this.state.edit;
    this.setState({
      edit: !afterUpdate,
    });
    const action = { type: 'UPDATE_CLASSROW', payload: this.state.classRow };
    this.props.dispatch(action);
  }

  render() {
    const { open, dimmer } = this.state;

    return (
      <>
        {/* <Table.Row>
              <Table.Cell>
                <Form.Field>
                  <Checkbox disabled />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="First Name" defaultValue={this.props.classes.instructor_name} onChange={this.handleChange('instructor_name')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="Email" defaultValue={this.props.classes.instructor_email} onChange={this.handleChange('instructor_email')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="Class Name" defaultValue={this.props.classes.class_name} onChange={this.handleChange('class_name')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="Start Date" defaultValue={this.props.classes.start_date} onChange={this.handleChange('start_date')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="End Date" defaultValue={this.props.classes.end_date} onChange={this.handleChange('end_date')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="Day of Week" defaultValue={this.props.classes.day_of_week} onChange={this.handleChange('day_of_week')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="Start Time" defaultValue={this.props.classes.start_time} onChange={this.handleChange('start_time')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="End Time" defaultValue={this.props.classes.numInstances} onChange={this.handleChange('numInstances')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="Student Cost" defaultValue={this.props.classes.student_cost} onChange={this.handleChange('student_cost')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="Instructor Rate" defaultValue={this.props.classes.instructor_pay} onChange={this.handleChange('instructor_pay')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="Course Description" defaultValue={this.props.classes.description} onChange={this.handleChange('description')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="Course Status" defaultValue={this.props.classes.phone_number} onChange={this.handleChange('phone_number')} />
                </Form.Field>
                <Icon name="save" onClick={this.updateclassRow} />
              </Table.Cell>
            </Table.Row>
          )
             ( */}
        <Table.Row>
          <Table.Cell><Checkbox disabled /></Table.Cell>
          <Table.Cell>{this.props.classes.instructor_name}</Table.Cell>
          <Table.Cell>{this.props.classes.instructor_email}</Table.Cell>
          <Table.Cell>{this.props.classes.class_name}</Table.Cell>
          <Table.Cell>{this.props.classes.start_date}</Table.Cell>
          <Table.Cell>{this.props.classes.end_date}</Table.Cell>
          <Table.Cell>{this.props.classes.day_of_week}</Table.Cell>
          <Table.Cell>{this.props.classes.start_time}</Table.Cell>
          <Table.Cell>{this.props.classes.end_time}</Table.Cell>
          <Table.Cell>{this.props.classes.num_of_sessions}</Table.Cell>
          <Table.Cell>{this.props.classes.student_cost}</Table.Cell>
          <Table.Cell>{this.props.classes.instructor_pay}</Table.Cell>
          <Table.Cell>{this.props.classes.description}</Table.Cell>
          <Table.Cell>Course Status</Table.Cell>
          <Table.Cell><Icon name="edit" onClick={this.show(true)} /></Table.Cell>
        </Table.Row>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Edit Class</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Group>
                  <Form.Input
                    label="First Name"
                    onChange={this.handleChange('instructor_name')}
                    placeholder="First Name"
                    defaultValue={this.props.classes.instructor_name}
                  />
                  <Form.Input
                    label="Email"
                    onChange={this.handleChange('instructor_email')}
                    placeholder="Email"
                    defaultValue={this.props.classes.instructor_email}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    label="Course Name"
                    onChange={this.handleChange('class_name')}
                    placeholder="Course Name"
                    defaultValue={this.props.classes.class_name}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    label="Start Date"
                    onChange={this.handleChange('start_date')}
                    placeholder="Start Date"
                    defaultValue={this.props.classes.start_date}
                    dateFormat="L"
                  />
                  <Form.Input
                    label="End Date"
                    onChange={this.handleChange('end_date')}
                    placeholder="End Date"
                    defaultValue={this.props.classes.end_date}
                    dateFormat="L"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    label="Day of Week"
                    onChange={this.handleChange('day_of_week')}
                    placeholder="Day of Week"
                    defaultValue={this.props.classes.day_of_week}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    label="Start Time"
                    onChange={this.handleChange('start_time')}
                    placeholder="Start Time"
                    defaultValue={this.props.classes.start_time}
                  />
                  <Form.Input
                    label="End Time"
                    onChange={this.handleChange('end_time')}
                    placeholder="End Time"
                    defaultValue={this.props.classes.end_time}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    label="Course Rate"
                    onChange={this.handleChange('student_cost')}
                    placeholder="Course Rate"
                    defaultValue={this.props.classes.student_cost}
                  />
                  <Form.Input
                    label="Instructor Pay"
                    onChange={this.handleChange('instructor_pay')}
                    placeholder="Instructor Pay"
                    defaultValue={this.props.classes.instructor_pay}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    label="Description"
                    onChange={this.handleChange('description')}
                    placeholder="Description"
                    defaultValue={this.props.classes.description}
                  />
                </Form.Group>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Update"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(FutureSessionTableRow));
