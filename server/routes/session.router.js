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

module.exports = router;
