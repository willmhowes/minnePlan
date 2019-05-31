const express = require('express');

const router = express.Router();
// const pool = require('../modules/pool');

const { removeDuplicates } = require('../modules/emailHandler');

router.post('/', (req, res) => {
  console.log('sending email to:', req.body);
  console.log(req.body.email);
  removeDuplicates(req.body.email, res);
  // sendEmail(req.body.email, res);
  // get function to get id's for all instructors being emailed
  // update function to update all classes in planning session w/ id's of instructors
});

module.exports = router;
