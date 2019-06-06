const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const addClassRouter = require('./routes/class.router');
const instructorRouter = require('./routes/instructor.router');
const instructorScheduleRouter = require('./routes/instructorSchedule.router');
const sessionRouter = require('./routes/session.router');
const instructorAuth = require('./routes/instructorAuth.router');
const sendEmail = require('./routes/emailer.router');

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
app.use('/api/classes', addClassRouter);
app.use('/api/instructor', instructorRouter);
app.use('/instructorSchedule', instructorScheduleRouter);
app.use('/api/session', sessionRouter);
app.use('/api/instructor/login/', instructorAuth);
app.use('/send/email', sendEmail);

// Serve static files
app.use(express.static('build'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
