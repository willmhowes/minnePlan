const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const addClassRouter = require('./routes/addClass.router');
const instructorRouter = require('./routes/instructor.router');
<<<<<<< HEAD
const instructorScheduleRouter = require('./routes/instructorSchedule.router');
=======
const sessionRouter = require('./routes/session.router');
>>>>>>> f258a428eb5d1c3a39015f54139259433fbc4633

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/add-new-class', addClassRouter);
app.use('/api/instructor', instructorRouter);
app.use('/instructorSchedule', instructorScheduleRouter);
app.use('/api/session', sessionRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
