const AllowOnlyAuthenticatedInstructor = (req, res, next) => {
  // check if logged in as an instructor
  if (req.isAuthenticated() && req.user.userGroup === 'instructor') {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

module.exports = { AllowOnlyAuthenticatedInstructor };
