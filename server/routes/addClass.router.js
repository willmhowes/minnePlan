const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// POST route to add a new class
// router.post('/add-new-class', async (req, res, next) => {
//   const client = await pool.connect();

//   console.log(req.body);
//   const season = req.body.season;
//   const year = req.body.year;
//   const instructorName = req.body.instructor_name;
//   const instructorEmail = req.body.instructor_email;
//   const className = req.body.class_name;
//   const day = req.body.day_of_week;
//   const startDate = req.body.start_date;
//   const endDate = req.body.end_date;
//   const startTime = req.body.start_time;
//   const endTime = req.body.end_time;
//   const studentCost = req.body.student_cost;
//   const instructorPay = req.body.instructor_pay;
//   const description = req.body.description;

//   const queryText = 'SELECT FROM "sessions" (season, year, ) VALUES ($1, $2) RETURNING id';
//   const queryText2 = 'SELECT FROM "instructors" ( instructor_name, instructor_email ) VALUES ($1, $2) RETURNING id';
//   const queryText3 = 'INSERT INTO "classes" (session_ref, instructor_ref, class_name, day_of_week, start_date, end_date, start_time, end_time, student_cost, instructor_pay, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
//   try {
//     await client.query('BEGIN');
//     const sessionsResult = await client.query(queryText, [season, year]);
//     const sessionsid = sessionsResult.rows[0].id;
//     console.log(sessionsid);

//     const instructorsResult = await client.query(queryText2, [instructorName, instructorEmail]);
//     const instructorsid = instructorsResult.rows[0].id;
//     console.log(instructorsid);

//     const classes = await client.query(queryText3, [sessionsid, instructorsid, className, day, startDate, endDate, startTime, endTime, studentCost, instructorPay, description]);
//     await client.query('COMMIT');
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.log('adding user info error', error);
//   } finally {
//     client.release();
//   }
// });

module.exports = router;
