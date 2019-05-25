import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table, Menu, Icon,
} from 'semantic-ui-react';
import FutureSessionTableRow from '../FutureSessionTableRow/FutureSessionTableRow';
import './FutureSession.css';

const pretendData = [1, 2, 3];

class FutureSession extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="legend">
          <h3 className="colorLegend">Color Legend</h3>
          <ul className="legendList">
            <li>
              White - Default
            </li>
            <li>
              Yellow - Pending
            </li>
            <li>
              Blue - Needs permit
            </li>
            <li>
              Orange - Needs Review
            </li>
            <li>
              Green - Ready to Transfer
            </li>
            <li>
              Red - No Instructor
            </li>
            <li>
              Grey - Transfered to Eleyo
            </li>
          </ul>
        </div>
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
                <Table.HeaderCell>Time of Day</Table.HeaderCell>
                <Table.HeaderCell>Num. of instances</Table.HeaderCell>
                <Table.HeaderCell>Course Rate</Table.HeaderCell>
                <Table.HeaderCell>Course Status</Table.HeaderCell>
                <Table.HeaderCell>Course Description</Table.HeaderCell>
                <Table.HeaderCell>Edit Course</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {pretendData.map(() => <FutureSessionTableRow />)}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="13">
                  <Menu floated="right" pagination>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron left" />
                    </Menu.Item>
                    <Menu.Item as="a">1</Menu.Item>
                    <Menu.Item as="a">2</Menu.Item>
                    <Menu.Item as="a">3</Menu.Item>
                    <Menu.Item as="a">4</Menu.Item>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron right" />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(FutureSession));
