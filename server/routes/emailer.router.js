const express = require('express');

const router = express.Router();
const pool = require('../modules/pool');

const { removeDuplicates } = require('../modules/emailHandler');

router.post('/', async (req, res) => {
  const client = await pool.connect();
  removeDuplicates(req.body.email, res);
  // sendEmail(req.body.email, res);
  // update function to update all classes in planning session w/ id's of instructors
  const updateQuery = 'UPDATE "classes" SET "preparation_status" = $1 WHERE "instructor_ref" = $2;';
  const getQuery = 'SELECT * FROM "instructors" WHERE "instructor_email"=$1';
  await Promise.all(req.body.email.map(async (email) => {
    try {
      await client.query('BEGIN');
      const getSql = await client.query(getQuery, [email]);
      const updateSql = await client.query(updateQuery, ['pending response', getSql.rows[0].id]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      res.sendStatus(500);
    }
  }));
  client.release();
  res.sendStatus(200);
});

module.exports = router;
