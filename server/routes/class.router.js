const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const newClass = req.body;
  const queryText = `INSERT INTO "classes"(session_ref, instructor_ref, class_name, day_of_week, start_date,
                      end_date, start_time, end_time, student_cost, instructor_pay, description, num_of_sessions, building, classroom_number)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
  const queryValues = [
    newClass.session,
    newClass.instructorRef,
    newClass.className,
    newClass.day,
    newClass.startDate,
    newClass.endDate,
    newClass.startTime,
    newClass.endTime,
    newClass.studentCost,
    newClass.instructorPay,
    newClass.description,
    newClass.numInstances,
    newClass.building,
    newClass.classroom,
  ];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error adding new class', err);
      res.sendStatus(500);
    });
});

router.get('/future', (req, res) => {
  console.log('getting classes');
  const classesQuery = `SELECT  "classes"."id", "class_name", "start_date", "end_date", "day_of_week","start_time", "end_time", "instructor_pay", "num_of_sessions", "student_cost", "description", "instructor_name", "instructor_email", "building", "classroom_number" FROM "classes"
                        JOIN "instructors" ON "classes"."instructor_ref" = "instructors"."id"
                        JOIN "sessions" ON "classes"."session_ref" = "sessions"."id"
                        WHERE "sessions"."session_status" = 'planning'`;
  pool.query(classesQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('error getting future classes', error);
      res.sendStatus(500);
    });
});

router.get('/current', (req, res) => {
  console.log('getting classes');
  const classesQuery = `SELECT  "classes"."id", "class_name", "start_date", "end_date", "day_of_week","start_time", "end_time", "instructor_pay", "num_of_sessions", "student_cost", "description", "instructor_name", "instructor_email" FROM "classes"
                        JOIN "instructors" ON "classes"."instructor_ref" = "instructors"."id"
                        JOIN "sessions" ON "classes"."session_ref" = "sessions"."id"
                        WHERE "sessions"."session_status" = 'current'`;
  pool.query(classesQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('error getting future classes', error);
      res.sendStatus(500);
    });
});

router.get('/history/:season/:year', rejectUnauthenticated, (req, res) => {
  console.log('getting archived classes', req.params);
  const archivedQuery = `SELECT "classes"."id", "class_name", "description", "day_of_week", "materials_cost", "building", "instructor_name", "instructor_pay", "student_cost" FROM "classes"
                          JOIN "instructors" ON "classes"."instructor_ref" = "instructors"."id"
                          JOIN "sessions" ON "classes"."session_ref" = "sessions"."id"
                          WHERE "sessions"."season" = ${req.params.season} AND "sessions"."year" = ${req.params.year};`;
  pool.query(archivedQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('error getting archived classes', error);
      res.sendStatus(500);
    });
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log(req.params.id);
  const queryText = 'SELECT * FROM "classes" WHERE id = $1';
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

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('hit update class information', req.body.classRow);
  const id = req.body.classRow.id;
  // const name = req.body.instructor_name;
  // const email = req.body.instructor_email;
  const className = req.body.classRow.class_name;
  const startDate = req.body.classRow.start_date;
  const endDate = req.body.classRow.end_date;
  const weekDay = req.body.classRow.day_of_week;
  const classCost = req.body.classRow.student_cost;
  const instructorPay = req.body.classRow.instructor_pay;
  const startTime = req.body.classRow.time_of_day;
  // Not able to update instructor currently
  const queryText = 'UPDATE "classes" SET "class_name" = $1, "start_date" = $2, "end_date" = $3, "day_of_week" = $4, "start_time" = $5, "student_cost" = $6, "instructor_pay" = $7 WHERE "id" = $8;';
  pool.query(queryText,
    [className, startDate, endDate, weekDay, startTime, classCost, instructorPay, id])
    .then((result) => {
      res.sendStatus(200);
      console.log('back from database', result);
    })
    .catch((err) => {
      console.log('Error updating class', err);
      res.sendStatus(500);
    });
});

module.exports = router;
