import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table, Button, Modal, Form,
} from 'semantic-ui-react';
import FutureSessionTableRow from '../FutureSessionTableRow/FutureSessionTableRow';
import './FutureSession.css';

class FutureSession extends Component {
  state = {
    email: [],
    open: false,
    session: {
      season: 0,
      year: 0,
    },
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_CLASSES' });
    this.props.dispatch({ type: 'GET_INSTRUCTORS' });
    this.props.dispatch({ type: 'GET_SEASONS' });
    this.props.dispatch({ type: 'GET_YEARS' });
  }

  handleSelect = (event, { value }) => {
    console.log('in checkbox handler', value);
    this.setState(prevState => ({
      email: [...prevState.email, value],
    }));
  }

  sendEmailClick = () => {
    console.log('email button clicked');
    this.props.dispatch({ type: 'SEND_EMAIL', payload: this.state.email });
  }

  show = () => this.setState({ open: true });

  close = () => {
    this.setState({ open: false });
    const action = { type: 'NEW_SESSION', payload: this.state.session };
    console.log(action);
    this.props.dispatch(action);
  }

  handleChange = (event, { name, value }) => {
    this.setState(prevState => ({ session: { ...prevState.session, [name]: value } }));
  }

  render() {
    const { open, dimmer } = this.state;

    return (
      <div className="page-container">
        <pre>{JSON.stringify(this.state)}</pre>
        <div className="legend">
          <h3 className="colorLegend">Color Legend</h3>
          <ul className="legendList">
            <li>
              White - No Status
            </li>
            <li>
              Yellow - pending response
            </li>
            <li>
              Blue - needs permit
            </li>
            <li>
              Orange - needs review
            </li>
            <li>
              Green - ready to transfer
            </li>
            <li>
              Red - no instructor
            </li>
            <li>
              Grey - transfered to eleyo
            </li>
          </ul>
        </div>
        <Button onClick={this.sendEmailClick}>Email Instructors</Button>
        <Button onClick={this.show}>Start New Session</Button>
        <div className="FutureSession-table-container">
          <br />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Select</Table.HeaderCell>
                <Table.HeaderCell>Instructor Name</Table.HeaderCell>
                <Table.HeaderCell>Instructor Email</Table.HeaderCell>
                <Table.HeaderCell>Course Name</Table.HeaderCell>
                <Table.HeaderCell>Start Date</Table.HeaderCell>
                <Table.HeaderCell>End Date</Table.HeaderCell>
                <Table.HeaderCell>Day of the Week</Table.HeaderCell>
                <Table.HeaderCell>Start Time</Table.HeaderCell>
                <Table.HeaderCell>End Time</Table.HeaderCell>
                <Table.HeaderCell>Building</Table.HeaderCell>
                <Table.HeaderCell>Classroom</Table.HeaderCell>
                <Table.HeaderCell>Num. of instances</Table.HeaderCell>
                <Table.HeaderCell>Course Rate</Table.HeaderCell>
                <Table.HeaderCell>Instructor Rate</Table.HeaderCell>
                <Table.HeaderCell>Course Description</Table.HeaderCell>
                <Table.HeaderCell>Course Status</Table.HeaderCell>
                <Table.HeaderCell>Edit Course</Table.HeaderCell>
                <Table.HeaderCell>Delete Course</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.reduxState.futureSetClassReducer
                .map(classes => (
                  <FutureSessionTableRow
                    classes={classes}
                    key={classes.id}
                    select={this.handleSelect}
                  />
                ))}
            </Table.Body>
          </Table>
          <Modal dimmer={dimmer} open={open} onClose={this.close}>
            <Modal.Header>Start a New Session</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <p>
                Please select new sessions season and year:
                </p>
              </Modal.Description>
              <Form className="FindSession" onClick={this.handleSubmit}>
                <Form.Group>
                  <Form.Select
                    label="Season"
                    name="season"
                    options={this.props.reduxState.season.map(season => ({
                      key: season.id,
                      text: season.season,
                      value: season.id,
                    }))}
                    onChange={this.handleChange}
                  />
                  <Form.Select
                    label="Year"
                    name="year"
                    options={this.props.reduxState.year.map(year => ({
                      key: year.id,
                      text: year.years,
                      value: year.id,
                    }))}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={this.close}>
              Add new session
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(FutureSession));
