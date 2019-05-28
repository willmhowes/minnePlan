import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table, Checkbox, Icon, Button,
} from 'semantic-ui-react';

class CurrentSessionTableRow extends Component {
  handleSelect = () => {
    console.log('in checkbox handler');
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          <Checkbox onClick={this.handleSelect} />
        </Table.Cell>
        <Table.Cell>Cell1</Table.Cell>
        <Table.Cell>Cell2</Table.Cell>
        <Table.Cell>Cell3</Table.Cell>
        <Table.Cell>Cell4</Table.Cell>
        <Table.Cell>Cell5</Table.Cell>
        <Table.Cell>Cell6</Table.Cell>
        <Table.Cell>Cell7</Table.Cell>
        <Table.Cell>Cell8</Table.Cell>
        <Table.Cell>Cell9</Table.Cell>
        <Table.Cell>Cell10</Table.Cell>
        <Table.Cell>Cell11</Table.Cell>
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
