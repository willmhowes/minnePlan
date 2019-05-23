const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('getting instructors');
  const instructorQuery = 'SELECT "id", "instructor_name", "instructor_email", "phone_number" FROM "instructors"';
  pool.query(instructorQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('error getting instructors', error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  const queryText = `INSERT INTO "instructors" ("instructor_name", "instructor_email", "phone_number")
  VALUES ($1, $2, $3);`;
  const queryValues = [req.body.instructor_name, req.body.instructor_email, req.body.phone_number];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error adding new instructor', err);
      res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  const queryText = 'SELECT "id", "instructor_name", "instructor_email", "phone_number" FROM "instructors" WHERE id = $1';
  pool.query(queryText, [req.params.id])
    .then((response) => { res.send(response.rows); })
    .catch((err) => {
      console.log('Error completing SELECT instructor', err);
      res.sendStatus(500);
    });
});

module.exports = router;
