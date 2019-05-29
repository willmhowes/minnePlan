const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
// const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  console.log('------ in serialize user ------');
  console.log('user:', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('------ in deserialize user ------');
  console.log('user:', user);
  done(null, user);
});

// Does actual work of logging in
passport.use('auth0', new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL,
  scope: 'openid email profile',
}, ((accessToken, refreshToken, extraParams, profile, done) => {
  console.log('profile:', profile);
  done(null, profile);
})));

module.exports = passport;
