import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Segment } from 'semantic-ui-react';

class History extends Component {
  state = {
    season: '',
    year: '',
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_SEASONS' });
    this.props.dispatch({ type: 'GET_YEARS' });
  }

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('in handleSubmit');
    // GET archived session data
    this.props.dispatch({ type: 'GET_ARCHIVED', payload: this.state });
    this.history.push('/archived-session-history');
  }

  render() {
    return (
      <Segment attached>
        {/* <pre>{JSON.stringify(this.state)}</pre> */}
        <Form className="FindSession" onSubmit={this.handleSubmit}>
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
          <Form.Button type="submit">Find Session</Form.Button>
        </Form>
      </Segment>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withRouter(History));
