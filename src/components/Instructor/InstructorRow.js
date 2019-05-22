import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Table, Button } from 'semantic-ui-react'
import './Instructor.css'

class Instructor extends Component {

  state = {
    edit: false
  }

  editInstructor = () => {
    console.log('Edit instructor button clicked')
  }

  render() {
    return (
          <Table.Row key={this.props.instructor.id}>
            <Table.Cell>{this.props.instructor.instructor_name}</Table.Cell>
            <Table.Cell>{this.props.instructor.instructor_email}</Table.Cell>
            <Table.Cell>
              <span className="icon">{this.props.instructor.phone_number}</span>
              <Icon name="edit" onClick={this.editInstructor}></Icon>
            </Table.Cell>
          </Table.Row>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(Instructor));
