const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// gets all classes assigned to logged in instructor, with session status of planning
router.get('/', (req, res) => {
  const { id } = req.user;
  const scheduleQuery = `SELECT "classes"."id", "class_name", "start_date", "end_date", "day_of_week","start_time",
                          "end_time", "instructor_pay", "classroom_number", "building", "instructor_name", "session_status" FROM "classes"
                        JOIN "instructors" ON "classes"."instructor_ref" = "instructors"."id"
                        JOIN "sessions" ON "classes"."session_ref" = "sessions"."id"
                        WHERE "instructor_ref" = $1 AND "session_status" = 'planning'`;
  pool.query(scheduleQuery, [id])
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('Error:', error);
      res.sendStatus(500);
    });
});

// gets class count of logged in instructor
router.get('/classcount', (req, res) => {
  const { id } = req.user;
  const countQuery = `SELECT COUNT("class_name"), "instructors"."instructor_name", "seasons"."season", "years"."years" FROM "instructors"
                       JOIN "classes" ON "classes"."instructor_ref" = "instructors"."id"
                       JOIN "sessions" ON "classes"."session_ref" = "sessions"."id"
                       JOIN "years" ON "sessions"."year" = "years"."id"
                       JOIN "seasons" ON "sessions"."season" = "seasons"."id"
                       WHERE "instructor_ref" = $1 AND "session_status" = 'planning'
                       GROUP BY "instructor_name", "seasons"."season", "years"."years";`;
  pool.query(countQuery, [id])
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('Error:', error);
      res.sendStatus(500);
    });
});

// updates class with instructor's repsonse
router.put('/', (req, res) => {
  const id = req.body.id;
  const reason = req.body.reason;
  const status = req.body.status;
  const queryText = 'UPDATE "classes" SET "preparation_status" = $1, "preparation_message" = $2 WHERE "id" = $3;';
  pool.query(queryText, [status, reason, id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
