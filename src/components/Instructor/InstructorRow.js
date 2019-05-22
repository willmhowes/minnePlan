import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Table } from 'semantic-ui-react'
import './Instructor.css'

class Instructor extends Component {

  state = {
    edit: false,
    instructor: {
      id: this.props.instructor.id,
      instructor_name: this.props.instructor.instructor_name,
      instructor_email: this.props.instructor.instructor_email,
      phone_number: this.props.instructor.phone_number
    }
  }

  editInstructor = () => {
    console.log('Edit instructor button clicked', this.state.edit)
    this.setState({
      edit: !this.state.edit
    })
  }

  render() {
    return (
      <>
            {this.state.edit ?
            <Table.Row>
              <Table.Cell>change</Table.Cell>
              <Table.Cell>change</Table.Cell>
              <Table.Cell>change <Icon name="save"></Icon></Table.Cell>
            </Table.Row>
            :
            <Table.Row>
              <Table.Cell>{this.props.instructor.instructor_name}</Table.Cell>
              <Table.Cell>{this.props.instructor.instructor_email}</Table.Cell>
              <Table.Cell>
                <span className="icon">{this.props.instructor.phone_number}</span>
                <Icon name="edit" onClick={this.editInstructor}></Icon>
              </Table.Cell>
            </Table.Row>
            }
      </>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(Instructor));
