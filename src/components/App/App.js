import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  // Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// import LoginPage from '../LoginPage/LoginPage';
import FutureSession from '../FutureSession/FutureSession';
import History from '../History/History';

import './App.css';
import CurrentSession from '../CurrentSession/CurrentSession';
import AddNewClass from '../AddNewClass/AddNewClass';
import Instructor from '../Instructor/Instructor';
import AddNewInstructor from '../AddNewInstructor/AddNewInstructor';
// importing semanitc ui styling
import 'semantic-ui-css/semantic.min.css';

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
            {/* <Route
              exact
              path="/"
              component={LoginPage}
            /> */}
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            ProtectedRoute will show the 'Login / Register' page if the user is not logged in */}
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
              path="/add-new-class"
              component={AddNewClass}
            />
            <ProtectedRoute
              exact
              path="/instructor"
              component={Instructor}
            />
            {/* This works the same as the other protected route,
            except that if the user is logged in,
            they will see the info page instead. */}
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
