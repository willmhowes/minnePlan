const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('getting instructors schedule');
  const scheduleQuery = `SELECT "classes"."id", "class_name", "start_date", "end_date", "day_of_week","start_time",
                          "end_time", "instructor_pay", "classroom_number", "building", "instructor_name", "session_status" FROM "classes"
                        JOIN "instructors" ON "classes"."instructor_ref" = "instructors"."id"
                        JOIN "sessions" ON "classes"."session_ref" = "sessions"."id"
                        WHERE "instructor_ref" = 2 AND "session_status" = 'planning';`;
  pool.query(scheduleQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('error getting instructors schedule', error);
      res.sendStatus(500);
    });
});

router.get('/classcount', (req, res) => {
  console.log('getting class count');
  const countQuery = `SELECT COUNT("class_name"), "instructors"."instructor_name" FROM "instructors"
                        JOIN "classes" ON "classes"."instructor_ref" = "instructors"."id"
                        JOIN "sessions" ON "classes"."session_ref" = "sessions"."id"
                        WHERE "instructor_ref" = 2 AND "session_status" = 'planning'
                        GROUP BY "instructor_name";`;
  pool.query(countQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('error getting instructors schedule', error);
      res.sendStatus(500);
    });
});

router.put('/', (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const reason = req.body.reason;
  const status = req.body.status;
  const queryText = 'UPDATE "classes" SET "preparation_status" = $1, "preparation_message" = $2 WHERE "id" = $3;';
  pool.query(queryText, [reason, status, id])
    .then((result) => {
      res.sendStatus(200);
      console.log('back from database after updating class', result);
    })
    .catch((err) => {
      console.log('Error completing SELECT shoe', err);
      res.sendStatus(500);
    });
});

module.exports = router;
