const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('getting instructors schedule');
  const scheduleQuery = `SELECT "classes"."id", "class_name", "start_date", "end_date", "day_of_week","start_time",
                          "end_time", "instructor_pay", "classroom_number", "building", "instructor_name", "is_being_planned" FROM "classes"
                        JOIN "instructors" ON "classes"."instructor_ref" = "instructors"."id"
                        JOIN "sessions" ON "classes"."session_ref" = "sessions"."id"
                        WHERE "instructor_ref" = 2 AND "is_being_planned" = TRUE;`;
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
                        WHERE "instructor_ref" = 2 AND "is_being_planned" = TRUE
                        GROUP BY "instructor_name";`;
  pool.query(countQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('error getting instructors schedule', error);
      res.sendStatus(500);
    });
});

module.exports = router;
