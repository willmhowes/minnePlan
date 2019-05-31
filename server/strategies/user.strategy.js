/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((userObj, done) => {
  const { user, userGroup } = userObj;
  const identity = { id: user.id, userGroup };
  console.log(identity);
  done(null, identity);
});

passport.deserializeUser((identity, done) => {
  const { id, userGroup } = identity;

  if (userGroup === 'instructor') {
    pool.query('SELECT * FROM "instructors" WHERE "id" = $1', [id])
      .then((result) => {
        const user = result && result.rows && result.rows[0];
        if (user) {
          user.userGroup = userGroup; // add userGroup to user object
          done(null, user); // done takes an error (null in this case) and a user
        } else {
        // user not found
        // done takes an error (null in this case) and a user (also null in this case)
        // this will result in the server returning a 401 status code
          done(null, null);
        }
      }).catch((error) => {
        console.log('Error with query during deserializing instructor ', error);
        // done takes an error (we have one) and a user (null in this case)
        // this will result in the server returning a 500 status code
        done(error, null);
      });
  } else if (userGroup === 'site_coordinator') {
    pool.query('SELECT * FROM "user" WHERE id = $1', [id]).then((result) => {
      // Handle Errors
      const user = result && result.rows && result.rows[0];

      if (user) {
        delete user.password; // remove password so it doesn't get sent
        user.userGroup = userGroup; // add userGroup to user object
        done(null, user); // done takes an error (null in this case) and a user
      } else {
      // user not found
      // done takes an error (null in this case) and a user (also null in this case)
      // this will result in the server returning a 401 status code
        done(null, null);
      }
    }).catch((error) => {
      console.log('Error with query during deserializing user ', error);
      // done takes an error (we have one) and a user (null in this case)
      // this will result in the server returning a 500 status code
      done(error, null);
    });
  } else {
    done(null, null);
  }
});

// Handles the logging in of an 'instructor'
passport.use('auth0', new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL,
  scope: 'openid email',
}, ((accessToken, refreshToken, extraParams, profile, done) => {
  console.log('email:', profile._json.email);
  const { email } = profile._json;

  pool.query('SELECT * FROM "instructors" WHERE "instructor_email" = $1', [email])
    .then((result) => {
      let user = result && result.rows && result.rows[0];
      // Set userGroup to be 'instructor' as a way of specifying user privilege
      user = { user, userGroup: 'instructor' };
      done(null, user);
    }).catch((error) => {
      console.log('Error with query for instructor ', error);
      // done takes an error (we have one) and a user (null in this case)
      // this will result in the server returning a 500 status code
      done(error, null);
    });
})));

// Handles the logging in of a 'site_coordinator'
passport.use('local', new LocalStrategy((username, password, done) => {
  pool.query('SELECT * FROM "user" WHERE username = $1', [username])
    .then((result) => {
      let user = result && result.rows && result.rows[0];
      if (user && encryptLib.comparePassword(password, user.password)) {
        // All good! Passwords match!
        // done takes an error (null in this case) and a user
        user = { user, userGroup: 'site_coordinator' };
        done(null, user);
      } else {
        // Not good! Username and password do not match.
        // done takes an error (null in this case) and a user (also null in this case)
        // this will result in the server returning a 401 status code
        done(null, null);
      }
    }).catch((error) => {
      console.log('Error with query for user ', error);
      // done takes an error (we have one) and a user (null in this case)
      // this will result in the server returning a 500 status code
      done(error, null);
    });
}));

module.exports = passport;
