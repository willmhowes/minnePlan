const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/callback',
  (req, res, next) => {
    next();
  },
  passport.authenticate('auth0'),
  (req, res) => {
    res.redirect('https://glacial-scrubland-22554.herokuapp.com/instructor-schedule');
  });

module.exports = router;
