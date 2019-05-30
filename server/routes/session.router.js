const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('getting sessions');
  // change sql text
  const sessionQuery = 'SELECT "sessions"."id", "seasons"."season", "years"."years" FROM "sessions" JOIN "seasons" ON "sessions"."season" = "seasons"."id" JOIN "years" ON "sessions"."year" = "years"."id";';
  pool.query(sessionQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('error getting session', error);
      res.sendStatus(500);
    });
});

router.get('/year', rejectUnauthenticated, (req, res) => {
  console.log('getting years');
  // change sql text
  const yearQuery = 'SELECT * FROM "years" ORDER BY "years" ASC;';
  pool.query(yearQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('error getting year', error);
      res.sendStatus(500);
    });
});

router.get('/season', rejectUnauthenticated, (req, res) => {
  console.log('getting seasons');
  // change sql text
  const yearQuery = 'SELECT * FROM "seasons";';
  pool.query(yearQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('error getting season', error);
      res.sendStatus(500);
    });
});

router.put('/', rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  console.log('creating a new session', req.body);
  const updateCurrentSession = 'UPDATE "sessions" SET "session_status" = \'archived\' WHERE "session_status" = \'current\';';
  const updateFutureSession = 'UPDATE "sessions" SET "session_status" = \'current\' WHERE "session_status" = \'planning\';';
  const newSession = 'INSERT INTO "sessions" ("coordinator_ref", "season", "year", "session_status") VALUES (1, $1, $2, \'planning\');';
  try {
    await client.query('BEGIN');
    const updateCurrent = await client.query(updateCurrentSession);
    const updateFuture = await client.query(updateFutureSession);
    const createNew = await client.query(newSession, [req.body.season, req.body.year]);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('error creating new session', error);
  } finally {
    client.release();
  }
});

module.exports = router;
