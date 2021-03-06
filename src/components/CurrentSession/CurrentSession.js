import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table, Button,
} from 'semantic-ui-react';
import swal from 'sweetalert';
import CurrentSessionTableRow from '../CurrentSessionTableRow/CurrentSessionTableRow';
import './CurrentSession.css';

class CurrentSession extends Component {
  state = {
    idArray: [],
  };

  // on load of page dispatches to currentSessionSaga.js
  componentDidMount() {
    this.props.dispatch({ type: 'GET_CURRENT_SESSIONS' });
  }

  // on click of select box, add value to this.state.idArray array
  handleSelect = (event, { value }) => {
    this.setState(prevState => ({
      idArray: [...prevState.idArray, value],
    }));
  }

  // sends id to copyClassSaga.js, with all ids of selected classes
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
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Select</Table.HeaderCell>
              <Table.HeaderCell>
                Instructor Name
                <br />
                Instructor Email
              </Table.HeaderCell>
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
