import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { Menu } from 'semantic-ui-react'

class Nav extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
  const { activeItem } = this.state
  
  return (
  <div className="nav">
    <Link to="/home">
    <h2 className="nav-title">MinnePlan</h2>
    </Link>
    <div className="nav-right">
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {this.props.user.id && (
        <>
        <Menu>
        <Menu.Item
          name='instructor'
          active={activeItem === 'instructor'}
          onClick={this.handleItemClick}
          to="/instructor"
        >
          View Instructors
        </Menu.Item>

        <Menu.Item
          name='history'
          active={activeItem === 'history'}
          onClick={this.handleItemClick}
          to="/history"
        >
            History
        </Menu.Item>

        <Menu.Item
          name='current-session'
          active={activeItem === 'current-session'}
          onClick={this.handleItemClick}
          to="/current-session"
        >
          Current Session
        </Menu.Item>

        <Menu.Item
          name='future-session'
          active={activeItem === 'future-session'}
          onClick={this.handleItemClick}
          to="/home"
        >
          Future Session
        </Menu.Item>
        <Menu.Item
          name='add-new-class'
          active={activeItem === 'add-new-class'}
          onClick={this.handleItemClick}
          to="/add-new-class"
        >
          Add New Class
        </Menu.Item>
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={this.handleItemClick}
        >
          <LogOutButton className="nav-link" />
        </Menu.Item>
      </Menu>
        </>
      )}
    </div>
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

export default connect(mapStateToProps)(Nav);
