const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  console.log('getting archived classes');
  const instructorQuery = `SELECT "classes"."id", "class_name", "description", "day_of_week", "materials_cost", "building" FROM "classes"
                          JOIN "sessions" ON "classes"."session_ref" = "sessions"."id"
                          WHERE "sessions"."session_status" = 'archived';`;
  pool.query(instructorQuery)
    .then((response) => { res.send(response.rows); })
    .catch((error) => {
      console.log('error getting instructors', error);
      res.sendStatus(500);
    });
});

module.exports = router;
