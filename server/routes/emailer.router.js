const express = require('express');

const router = express.Router();
const pool = require('../modules/pool');
const { removeDuplicates } = require('../modules/emailHandler');

// sends emails to all instructors
router.post('/', async (req, res) => {
  const client = await pool.connect();
  // removes all duplicate emails, in emailHandler
  removeDuplicates(req.body.email, res);
  // update function to update all classes in planning session w/ id's of instructors
  const updateQuery = 'UPDATE "classes" SET "preparation_status" = $1 WHERE "instructor_ref" = $2;';
  const getQuery = 'SELECT * FROM "instructors" WHERE "instructor_email"=$1';
  // after duplicate emails are removed maps through all the emails
  await Promise.all(req.body.email.map(async (email) => {
    try {
      // begins sql transaction
      await client.query('BEGIN');
      // gets instructor based on their email
      const getSql = await client.query(getQuery, [email]);
      // updates on classes with the the instructor id received from selecting specific instructor
      // to pending repsonse
      const updateSql = await client.query(updateQuery, ['pending response', getSql.rows[0].id]);
      // pushes all sql queries all the way through
      await client.query(updateQuery, ['pending response', getSql.rows[0].id]);
      await client.query('COMMIT');
    } catch (error) {
      // aborts all sql queries if any of them fail
      await client.query('ROLLBACK');
      res.sendStatus(500);
    }
  }));
  client.release();
  res.sendStatus(200);
});

module.exports = router;
