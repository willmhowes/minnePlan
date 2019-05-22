import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import './Nav.css';

class Nav extends Component {
  state = {
    activeItem: null,
  }

  handleItemClick = (event) => {
    console.log('in handleItemClick');
    const value = event.target.getAttribute('value');

    if (value === 'view-instructors') {
      console.log('view-instructors button activated');
      this.props.history.push('/view-instructors');
      this.setState({ activeItem: value });
    } else if (value === 'session-history') {
      console.log('session-history button activated');
      this.props.history.push('/session-history');
      this.setState({ activeItem: value });
    } else if (value === 'current-session') {
      console.log('current-session button activated');
      this.props.history.push('/current-session');
      this.setState({ activeItem: value });
    } else if (value === 'future-session') {
      console.log('future-session button activated');
      this.props.history.push('/future-session');
      this.setState({ activeItem: value });
    } else if (value === 'add-new-class') {
      console.log('add-new-class button activated');
    } else if (value === 'logout') {
      this.props.dispatch({ type: 'LOGOUT' });
    }
  };

  render() {
    const { activeItem } = this.state;

    return (
      <div className="nav">
        <Link to="/future-session">
          <h2 className="nav-title">MinnePlan</h2>
        </Link>

        {this.props.user.id && (
          <div className="nav-right">
            <Menu>
              <Menu.Item
                className="nav-item"
                value="view-instructors"
                onClick={this.handleItemClick}
                active={activeItem === 'view-instructors'}
              >
                View Instructors
              </Menu.Item>
              <Menu.Item
                className="nav-item"
                value="session-history"
                onClick={this.handleItemClick}
                active={activeItem === 'session-history'}
              >
                History
              </Menu.Item>
              <Menu.Item
                className="nav-item"
                value="current-session"
                onClick={this.handleItemClick}
                active={activeItem === 'current-session'}
              >
                Current Session
              </Menu.Item>
              <Menu.Item
                className="nav-item"
                value="future-session"
                onClick={this.handleItemClick}
                active={activeItem === 'future-session'}
              >
                Future Session
              </Menu.Item>
              <Menu.Item
                className="nav-item"
                value="add-new-class"
                onClick={this.handleItemClick}
                active={activeItem === 'add-new-class'}
              >
                Add New Class
              </Menu.Item>

              <Menu.Menu position="right">
                <Menu.Item
                  className="nav-item"
                  value="logout"
                  onClick={this.handleItemClick}
                >
                  Logout
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </div>
        )}
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withRouter(Nav));
