import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table, Button,
} from 'semantic-ui-react';
import CurrentSessionTableRow from '../CurrentSessionTableRow/CurrentSessionTableRow';
import './CurrentSession.css';
import swal from 'sweetalert';

class CurrentSession extends Component {
  state = {
    idArray: [],
  };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_CURRENT_SESSIONS' });
  }

  handleSelect = (event, { value }) => {
    console.log('in checkbox handler', value);
    this.setState(prevState => ({
      idArray: [...prevState.idArray, value],
    }));
  }

  handleClick = () => {
    this.props.dispatch({ type: 'COPY_CLASS', payload: this.state.idArray });
    swal('Your class has been added to the future session!');
  }

  render() {
    return (
      <div className="CurrentSession-table-container">
        <br />
        <Button onClick={this.handleClick}>Add to Future Session</Button>
        <br />
        {/* <pre>{JSON.stringify(this.state)}</pre> */}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Select</Table.HeaderCell>
              <Table.HeaderCell>Instructor Name</Table.HeaderCell>
              <Table.HeaderCell>Instructor Email</Table.HeaderCell>
              <Table.HeaderCell>Course Name</Table.HeaderCell>
              <Table.HeaderCell>
                Start Date/
                <br />
                End Date
              </Table.HeaderCell>
              <Table.HeaderCell>Day of the Week</Table.HeaderCell>
              <Table.HeaderCell>
                Start Time/
                <br />
                End Time
              </Table.HeaderCell>
              <Table.HeaderCell>
                Building/
                <br />
                Classroom
              </Table.HeaderCell>
              <Table.HeaderCell>Num. of instances</Table.HeaderCell>
              <Table.HeaderCell>Course Rate</Table.HeaderCell>
              <Table.HeaderCell>Instructor Rate</Table.HeaderCell>
              <Table.HeaderCell>Materials Cost</Table.HeaderCell>
              <Table.HeaderCell>Course Description</Table.HeaderCell>
              <Table.HeaderCell>Edit Course</Table.HeaderCell>
              <Table.HeaderCell>Delete Course</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.reduxState.currentSessionReducer
              .map(classes => (
                <CurrentSessionTableRow
                  classes={classes}
                  key={classes.id}
                  select={this.handleSelect}
                />
              ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(CurrentSession));
