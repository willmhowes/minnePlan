const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// getting all sessions
router.get('/', rejectUnauthenticated, (req, res) => {
  const sessionQuery = 'SELECT "sessions"."id", "seasons"."season", "years"."years" FROM "sessions" JOIN "seasons" ON "sessions"."season" = "seasons"."id" JOIN "years" ON "sessions"."year" = "years"."id";';
  pool.query(sessionQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('Error:', error);
      res.sendStatus(500);
    });
});

// getting all years
router.get('/year', rejectUnauthenticated, (req, res) => {
  const yearQuery = 'SELECT * FROM "years" ORDER BY "years" ASC;';
  pool.query(yearQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('Error:', error);
      res.sendStatus(500);
    });
});

// getting all years
router.get('/season', rejectUnauthenticated, (req, res) => {
  const yearQuery = 'SELECT * FROM "seasons";';
  pool.query(yearQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('Error:', error);
      res.sendStatus(500);
    });
});

// update sessions when starting a new session
router.put('/', rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  const updateCurrentSession = 'UPDATE "sessions" SET "session_status" = \'archived\' WHERE "session_status" = \'current\';';
  const updateFutureSession = 'UPDATE "sessions" SET "session_status" = \'current\' WHERE "session_status" = \'planning\';';
  const newSession = 'INSERT INTO "sessions" ("coordinator_ref", "season", "year", "session_status") VALUES (1, $1, $2, \'planning\');';
  try {
    // begins transaction
    await client.query('BEGIN');
    // updates all current sessions to archived sessions
    await client.query(updateCurrentSession);
    // updates all planning sessions to current sessions
    await client.query(updateFutureSession);
    // creates a new session wit req.body
    await client.query(newSession, [req.body.season, req.body.year]);
    // proceeds with all sql if they all go through
    await client.query('COMMIT');
  } catch (error) {
<<<<<<< HEAD
    // aborts all sql queries if 1 fails
=======
    console.log('error creating new session', error);
>>>>>>> 87f291d31b6b8c1d2ddf6ae6159b500f5b2de4fe
    await client.query('ROLLBACK');
    res.sendStatus(500);
  } finally {
    // releases transaction
    client.release();
    res.sendStatus(200);
  }
});

module.exports = router;
