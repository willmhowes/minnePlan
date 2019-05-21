import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  //Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LoginPage from '../LoginPage/LoginPage';
import FutureSession from '../FutureSession/FutureSession';
import History from '../History/History'


import './App.css';
import CurrentSession from '../CurrentSession/CurrentSession';
import NewSession from '../NewSession/NewSession';
import Instructor from '../Instrructor/Instructor';
import AddNewInstructor from '../AddNewInstructor/AddNewInstructor';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route
              exact
              path="/"
              component={LoginPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={FutureSession}
            />
            <ProtectedRoute
              exact
              path="/history"
              component={History}
            />
            <ProtectedRoute
              exact
              path="/current-session"
              component={CurrentSession}
            />
            <ProtectedRoute
              exact
              path="/new-session"
              component={NewSession}
            />
            <ProtectedRoute
              exact
              path="/instructor"
              component={Instructor}
            />
            <ProtectedRoute
              exact
              path="/addnewinstructor"
              component={AddNewInstructor}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
