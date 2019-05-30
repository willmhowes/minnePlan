const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/callback',
  (req, res, next) => {
    console.log('in /callback');
    console.log('req.query:', req.url);
    next();
  },
  passport.authenticate('auth0'),
  (req, res) => {
    // console.log('req.session -- ', req.session);
    // console.log('req.session.returnTo -- ', req.session.returnTo);
    console.log('req.user -- ', req.user);
    res.redirect('http://localhost:3000/instructor_parse');
  });

module.exports = router;
