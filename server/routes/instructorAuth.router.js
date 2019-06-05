const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/callback',
  (req, res, next) => {
    next();
  },
  passport.authenticate('auth0'),
  (req, res) => {
    res.redirect('http://localhost:3000/instructor-schedule');
  });

module.exports = router;
