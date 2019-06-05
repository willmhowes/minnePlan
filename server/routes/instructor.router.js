const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const instructorQuery = 'SELECT "id", "instructor_name", "instructor_email", "phone_number" FROM "instructors" ORDER BY "instructor_name";';
  pool.query(instructorQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('Error:', error);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO "instructors" ("instructor_name", "instructor_email", "phone_number")
  VALUES ($1, $2, $3);`;
  const queryValues = [req.body.instructor_name, req.body.instructor_email, req.body.phone_number];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error:', err);
      res.sendStatus(500);
    });
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = 'SELECT "id", "instructor_name", "instructor_email", "phone_number" FROM "instructors" WHERE id = $1';
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('Error:', err);
      res.sendStatus(500);
    });
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.body.id;
  const name = req.body.instructor_name;
  const email = req.body.instructor_email;
  const phoneNum = req.body.phone_number;
  const queryText = 'UPDATE "instructors" SET "instructor_name" = $1, "instructor_email" = $2, "phone_number" = $3 WHERE "id" = $4;';
  pool.query(queryText, [name, email, phoneNum, id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
