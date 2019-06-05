import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table, Button, Modal, Form,
} from 'semantic-ui-react';
import FutureSessionTableRow from '../FutureSessionTableRow/FutureSessionTableRow';
import './FutureSession.css';
import swal from 'sweetalert';

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

  handleSelect = (email) => {
    this.setState(prevState => ({
      email: [...prevState.email, email],
    }));
  }

  sendEmailClick = () => {
    this.props.dispatch({ type: 'SEND_EMAIL', payload: this.state.email });
    swal('The instructor has been emailed their schedule!');
  }

  show = () => this.setState({ open: true });

  close = () => {
    this.setState({ open: false });
    const action = { type: 'NEW_SESSION', payload: this.state.session };
    this.props.dispatch(action);
  }

  handleChange = (event, { name, value }) => {
    this.setState(prevState => ({ session: { ...prevState.session, [name]: value } }));
  }

  render() {
    const { open, dimmer } = this.state;

    return (
      <div className="page-container">
        <div className="legend">
          <h3 className="colorLegend">Color Legend</h3>
          <ul className="legendList">
            <li className="white">
              White - No Status
            </li>
            <li className="yellow">
              Yellow - pending response
            </li>
            <li className="blue">
              Blue - needs permit
            </li>
            <li className="orange">
              Orange - needs review
            </li>
            <li className="olive">
              Green - ready to transfer
            </li>
            <li className="reds">
              Red - no instructor
            </li>
            <li className="grey">
              Grey - transferred to eleyo
            </li>
          </ul>
        </div>
        <div className="email-button">
          <Button onClick={this.sendEmailClick}>Email Instructors</Button>
          <Button onClick={this.show}>Start New Session</Button>
        </div>
        <div className="FutureSession-table-container">
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
                <Table.HeaderCell>Course Status</Table.HeaderCell>
                <Table.HeaderCell>Feedback</Table.HeaderCell>
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
