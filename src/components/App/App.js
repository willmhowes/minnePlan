import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// import LoginPage from '../LoginPage/LoginPage';
import FutureSession from '../FutureSession/FutureSession';
import History from '../History/History';
import CurrentSession from '../CurrentSession/CurrentSession';
import AddNewClass from '../AddNewClass/AddNewClass';
import Instructor from '../Instructor/Instructor';
import AddNewInstructor from '../AddNewInstructor/AddNewInstructor';
import InstructorSchedule from '../InstructorSchedule/InstructorSchedule';
import InstructorLogin from '../InstructorLogin/InstructorLogin';
import ArchivedSessions from '../ArchivedSessions/ArchivedSessions';

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
            <Redirect exact from="/" to="/future-session" />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/ will show the FutureSession if the user is logged in.
            ProtectedRoute will show the 'Login' page if the user is not logged in */}
            <ProtectedRoute
              exact
              path="/future-session"
              component={FutureSession}
            />
            <ProtectedRoute
              exact
              path="/session-history"
              component={History}
            />
            <ProtectedRoute
              exact
              path="/archived-session-history"
              component={ArchivedSessions}
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
              path="/view-instructors"
              component={Instructor}
            />
            <ProtectedRoute
              exact
              path="/instructor-schedule"
              component={InstructorSchedule}
            />
            {/* This works the same as the other protected route,
            except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/add-new-instructor"
              component={AddNewInstructor}
            />
            <Route
              exact
              path="/instructor_login"
              component={InstructorLogin}
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
