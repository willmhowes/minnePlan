const express = require('express');
const auth0Strategy = require('../strategies/instructor.strategy');
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
    .then((response) => {
      console.log(response.rows);
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT instructor', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const name = req.body.instructor_name;
  const email = req.body.instructor_email;
  const phoneNum = req.body.phone_number;
  const queryText = 'UPDATE "instructors" SET "instructor_name" = $1, "instructor_email" = $2, "phone_number" = $3 WHERE "id" = $4;';
  pool.query(queryText, [name, email, phoneNum, id])
    .then((result) => {
      res.sendStatus(200);
      console.log('back from database', result);
    })
    .catch((err) => {
      console.log('Error completing SELECT shoe', err);
      res.sendStatus(500);
    });
});

router.get('/callback', auth0Strategy.authenticate('auth0'),
  (req, res) => {
    console.log('req.session -- ', req.session);
    console.log('req.session.returnTo -- ', req.session.returnTo);
    console.log('req.user -- ', req.user);
    res.redirect('/instructor_login');
  });

module.exports = router;
