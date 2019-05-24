const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('getting sessions');
  const sessionQuery = 'SELECT * FROM "sessions"';
  pool.query(sessionQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('error getting session', error);
      res.sendStatus(500);
    });
});

module.exports = router;
