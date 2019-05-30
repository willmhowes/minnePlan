import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table, Checkbox, Icon, Button, Form, Modal,
} from 'semantic-ui-react';

const moment = require('moment');

class CurrentSessionTableRow extends Component {
  state = {
    classRow: {
      deleteOpen: false,
      editOpen: false,
      id: this.props.classes.id,
      instructor_name: this.props.classes.instructor_name,
      instructor_email: this.props.classes.instructor_email,
      class_name: this.props.classes.class_name,
      start_date: this.props.classes.start_date,
      end_date: this.props.classes.end_date,
      day_of_week: this.props.classes.day_of_week,
      start_time: this.props.classes.start_time,
      end_time: this.props.classes.end_time,
      building: this.props.classes.building,
      classroom: this.props.classes.classroom_number,
      num_of_instances: this.props.classes.numInstances,
      student_cost: this.props.classes.student_cost,
      instructor_pay: this.props.classes.instructor_pay,
      description: this.props.classes.description,
      course_status: this.props.classes.preparation_status,
    },
  }

  show = dimmer => () => this.setState({ dimmer, editOpen: true });

  showDelete = dimmer => () => this.setState({ dimmer, deleteOpen: true });

  closeEdit = () => {
    this.setState({ editOpen: false });
    const action = { type: 'UPDATE_CLASS_ROW', payload: this.state.classRow };
    console.log(action);
    this.props.dispatch(action);
  }

  close = () => {
    this.setState({ deleteOpen: false });
  }

  closeDelete = () => {
    this.setState({ deleteOpen: false });
    const action = { type: 'DELETE_CLASS', payload: this.state.classRow.id };
    console.log('deleting class', action);
    this.props.dispatch(action);
  }

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
    const { deleteOpen, editOpen, dimmer } = this.state;

    return (
      <>
        <Table.Row>
          <Table.Cell>
            <Checkbox onClick={this.props.select} value={this.props.classes.id} />
          </Table.Cell>
          <Table.Cell>{this.props.classes.instructor_name}</Table.Cell>
          <Table.Cell>{this.props.classes.instructor_email}</Table.Cell>
          <Table.Cell>{this.props.classes.class_name}</Table.Cell>
          <Table.Cell>{moment(this.props.classes.start_date).format('MM/DD/YYYY')}</Table.Cell>
          <Table.Cell>{moment(this.props.classes.end_date).format('MM/DD/YYYY')}</Table.Cell>
          <Table.Cell>{this.props.classes.day_of_week}</Table.Cell>
          <Table.Cell>{this.props.classes.start_time}</Table.Cell>
          <Table.Cell>{this.props.classes.end_time}</Table.Cell>
          <Table.Cell>{this.props.classes.num_of_sessions}</Table.Cell>
          <Table.Cell>{this.props.classes.student_cost}</Table.Cell>
          <Table.Cell>{this.props.classes.instructor_pay}</Table.Cell>
          <Table.Cell>{this.props.classes.description}</Table.Cell>
          <Table.Cell>Course Status</Table.Cell>
          <Table.Cell><Button><Icon name="edit" onClick={this.show(true)} /></Button></Table.Cell>
          <Table.Cell><Button><Icon name="trash" onClick={this.showDelete(true)} /></Button></Table.Cell>
        </Table.Row>
        <Modal dimmer={dimmer} open={editOpen} onClose={this.close}>
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
                  />
                  <Form.Input
                    label="End Date"
                    onChange={this.handleChange('end_date')}
                    placeholder="End Date"
                    defaultValue={this.props.classes.end_date}
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
                    label="Course Status"
                    onChange={this.handleChange('preparation_status')}
                    placeholder="Course Status"
                    defaultValue={this.props.classes.preparation_status}
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
              onClick={this.closeEdit}
            />
          </Modal.Actions>
        </Modal>
        <Modal dimmer={dimmer} open={deleteOpen} onClose={this.close}>
          <Modal.Header>Delete Class</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <p>
            Are you sure you want to delete
                {' '}
                {this.props.classes.class_name}
                {' '}
            on
                {this.props.classes.day_of_week}
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.close}>
          Do not delete class
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Delete class"
              onClick={this.closeDelete}
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

export default connect(mapReduxStateToProps)(withRouter(CurrentSessionTableRow));
