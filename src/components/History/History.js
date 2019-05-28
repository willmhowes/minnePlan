import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Segment } from 'semantic-ui-react';

class History extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_SESSIONS' });
  }

  render() {
    return (
      <Segment attached>
        <Form className="NewClass" onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Select
              label="Session"
              name="session"
              options={this.props.reduxState.session.map(session => ({
                key: session.id,
                text: session.season,
                value: session.id,
              }))}
              onChange={this.handleChange}
            />
            <Form.Select
              label="Session"
              name="session"
              options={this.props.reduxState.session.map(session => ({
                key: session.id,
                text: session.year,
                value: session.id,
              }))}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(History));
