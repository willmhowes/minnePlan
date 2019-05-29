const express = require('express');
const passport = require('passport');
// const auth0Strategy = require('../strategies/instructor.strategy');

const router = express.Router();

router.get('/callback',
  (req, res, next) => {
    console.log('in /callback');
    console.log('req.query:', req.query);
    next();
  },
  passport.authenticate('auth0'),
  (req, res) => {
    // console.log('req.session -- ', req.session);
    // console.log('req.session.returnTo -- ', req.session.returnTo);
    console.log('req.user -- ', req.user);
    res.send(req.user);
  });

module.exports = router;
