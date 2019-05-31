const express = require('express');

const router = express.Router();
const pool = require('../modules/pool');

const { removeDuplicates } = require('../modules/emailHandler');

router.post('/', async (req, res) => {
  const client = await pool.connect();
  console.log('sending email to:', req.body);
  console.log(req.body.email);
  removeDuplicates(req.body.email, res);
  // sendEmail(req.body.email, res);
  // update function to update all classes in planning session w/ id's of instructors
  console.log('updating class status');
  const updateQuery = 'UPDATE "classes" SET "preparation_status" = $1 WHERE "instructor_ref" = $2;';
  const getQuery = 'SELECT * FROM "instructors" WHERE "instructor_email"=$1';
  await Promise.all(req.body.email.map(async (email) => {
    try {
      await client.query('BEGIN');
      const getSql = await client.query(getQuery, [email]);
      console.log('back from database', getSql.rows[0].id);
      const updateSql = await client.query(updateQuery, ['pending response', getSql.rows[0].id]);
      console.log(updateSql);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      console.log('error updating class status', error);
      res.sendStatus(500);
    }
  }));
  client.release();
  res.sendStatus(200);
});

module.exports = router;
