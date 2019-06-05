const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// adds new class into database "classes"
router.post('/', rejectUnauthenticated, (req, res) => {
  const newClass = req.body;
  const queryText = `INSERT INTO "classes"(session_ref, instructor_ref, class_name, day_of_week, start_date,
                      end_date, start_time, end_time, student_cost, instructor_pay, description, num_of_sessions, building, classroom_number, materials_cost)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;
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
    newClass.materialsCost,
  ];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// gets all classes where the session associated to classes = planning
router.get('/future', (req, res) => {
  const classesQuery = `SELECT  "classes"."id", "class_name", "start_date", "end_date", "day_of_week","start_time", "end_time", "instructor_pay", "num_of_sessions", "student_cost", "description", "instructor_name", "instructor_email", "building", "classroom_number", "preparation_status", "preparation_message", "materials_cost" FROM "classes"
                        JOIN "instructors" ON "classes"."instructor_ref" = "instructors"."id"
                        JOIN "sessions" ON "classes"."session_ref" = "sessions"."id"
                        WHERE "sessions"."session_status" = 'planning'
                        ORDER BY "instructor_name";`;
  pool.query(classesQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      res.sendStatus(500);
    });
});

// gets all classes where the session associated to classes = current
router.get('/current', (req, res) => {
  const classesQuery = `SELECT  "classes"."id", "class_name", "start_date", "end_date", "day_of_week","start_time", "end_time", "instructor_pay", "num_of_sessions", "student_cost", "description", "instructor_name", "instructor_email", "building", "classroom_number", "preparation_status", "preparation_message", "materials_cost" FROM "classes"
                        JOIN "instructors" ON "classes"."instructor_ref" = "instructors"."id"
                        JOIN "sessions" ON "classes"."session_ref" = "sessions"."id"
                        WHERE "sessions"."session_status" = 'current'`;
  pool.query(classesQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      res.sendStatus(500);
    });
});

// gets all classes where the session associated to classes = archived based on the season and year
// sent over in the api url or params
router.get('/history/:season/:year', rejectUnauthenticated, (req, res) => {
  const archivedQuery = `SELECT "classes"."id", "class_name", "description", "day_of_week", "materials_cost", "building", "instructor_name", "instructor_pay", "student_cost" FROM "classes"
                          JOIN "instructors" ON "classes"."instructor_ref" = "instructors"."id"
                          JOIN "sessions" ON "classes"."session_ref" = "sessions"."id"
                          WHERE "sessions"."season" = ${req.params.season} AND "sessions"."year" = ${req.params.year};`;
  pool.query(archivedQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      res.sendStatus(500);
    });
});

// gets all classes with the id that is in api URL or params
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = 'SELECT * FROM "classes" WHERE id = $1';
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// updates class based on id, with class information
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.body.classRow.id;
  const className = req.body.classRow.class_name;
  const startDate = req.body.classRow.start_date;
  const endDate = req.body.classRow.end_date;
  const weekDay = req.body.classRow.day_of_week;
  const classCost = req.body.classRow.student_cost;
  const instructorPay = req.body.classRow.instructor_pay;
  const startTime = req.body.classRow.start_time;
  const endTime = req.body.classRow.end_time;
  const setStatus = req.body.classRow.preparation_status;
  const message = req.body.classRow.preparation_message;
  const description = req.body.classRow.description;
  const building = req.body.classRow.building;
  const classroom = req.body.classRow.classroom;
  const numInstances = req.body.classRow.num_of_sessions;
  const materialsCost = req.body.classRow.materials_cost;
  const queryText = 'UPDATE "classes" SET "class_name" = $1, "start_date" = $2, "end_date" = $3, "day_of_week" = $4, "start_time" = $5, "student_cost" = $6, "instructor_pay" = $7, "end_time" = $8, "preparation_status" = $9, "preparation_message" = $10, "description" = $11, "building" = $12, "classroom_number" = $13, "num_of_sessions" = $14, "materials_cost" = $15 WHERE "id" = $16;';
  pool.query(queryText,
    [
      className,
      startDate,
      endDate,
      weekDay,
      startTime,
      classCost,
      instructorPay,
      endTime,
      setStatus,
      message,
      description,
      building,
      classroom,
      numInstances,
      materialsCost,
      id,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// creates a new class
router.post('/copy', rejectUnauthenticated, async (req, res) => {
  // used to shorten pool.connect in transaction
  const client = await pool.connect();
  const sqlText = 'INSERT INTO "classes"(session_ref, instructor_ref, class_name, day_of_week, start_time, end_time, instructor_pay, materials_cost, building) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
  // maps throuhg the array of class.id's and gets class data and duplicates it with a new session id
  await Promise.all(req.body.map(async (id) => {
    try {
      // begins sql transacation
      await client.query('BEGIN');
      // gets all class information assocciated with id sent in req.body
      const getSql = await client.query(`SELECT * FROM "classes" WHERE id = ${id}`);
      // gets future session id, or session id == 'planning'
      const sessionSql = await client.query('SELECT * FROM "sessions" WHERE "session_status" = \'planning\';');
      const copyData = [
        sessionSql.rows[0].id,
        getSql.rows[0].instructor_ref,
        getSql.rows[0].class_name,
        getSql.rows[0].day_of_week,
        getSql.rows[0].start_time,
        getSql.rows[0].end_time,
        getSql.rows[0].instructor_pay,
        getSql.rows[0].materials_cost,
        getSql.rows[0].building,
      ];
      // uses sql text on line 140, and duplicates class data from getSql with session id from
      // sessionSql to create a new class
      await client.query(sqlText, copyData);
      // commits all sql request if all work
      await client.query('COMMIT');
    } catch (error) {
      // cancels all sql queries if any of the fail
      await client.query('ROLLBACK');
      res.sendStatus(500);
    }
  }));
  // release the transaction
  client.release();
  res.sendStatus(200);
});

// deletes class with id sent in params
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "classes" WHERE "id" = ${req.params.id};`;
  pool.query(queryText)
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
