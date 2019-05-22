const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('getting instructors');
  const instructorQuery = `SELECT "id", "instructor_name", "instructor_email", "phone_number" FROM "instructors"`;
  pool.query(instructorQuery)
  .then((result) => { res.send(result.rows); })
  .catch((error) => {
    console.log('error getting instructors');
    res.sendStatus(500);
  })
});

module.exports = router;
