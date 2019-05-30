const express = require('express');

const router = express.Router();
// const pool = require('../modules/pool');

const { removeDuplicates } = require('../modules/emailHandler');

router.post('/', (req, res) => {
  console.log('sending email to:', req.body);
  console.log(req.body.email);
  removeDuplicates(req.body.email, res);
  // sendEmail(req.body.email, res);
});

module.exports = router;
