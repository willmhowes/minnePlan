const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// POST route to add a new class
router.post('/add-new-class', async (req, res, next) => {
  const client = await pool.connect();

  console.log(req.body);
  const season = req.body.season;
  const year = req.body.year;
  const className = req.body.class_name;
  const day = req.body.day_of_week;
  const startDate = req.body.start_date;
  const endDate = req.body.end_date;
  const startTime = req.body.start_time;
  const endTime = req.body.end_time;
  const studentCost = req.body.student_cost;
  const instructorPay = req.body.instructor_pay;
  const description = req.body.description;

  const queryText = 'INSERT INTO "sessions" (season, year, ) VALUES ($1, $2) RETURNING id';
  const queryText2 = 'INSERT INTO "classes" (session_ref, class_name, day_of_week, start_date, end_date, start_time, end_time, student_cost, instructor_pay, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';

  try {
    await client.query('BEGIN');
    const result = await client.query(queryText, [season, year]);
    const id = result.rows[0].id;
    console.log(id);

    const classes = await client.query(queryText2, [id, className, day, startDate, endDate, startTime, endTime, studentCost, instructorPay, description]);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('adding user info error', error);
  } finally {
    client.release();
  }
});

module.exports = router;
