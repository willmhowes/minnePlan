import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table, Checkbox, Icon, Button,
} from 'semantic-ui-react';

class CurrentSessionTableRow extends Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>
          <Checkbox onClick={this.props.select} value={this.props.classes.id} />
        </Table.Cell>
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
        <Table.Cell>
          <Button><Icon name="edit" /></Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(CurrentSessionTableRow));
