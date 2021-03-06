import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import instructor from './setInstructorSaga';
import addInstructor from './addInstructorSaga';
import updateInstructor from './updateInstructorSaga';
import instructorSchedule from './instructorScheduleSaga';
import classCount from './classCountSaga';
import session from './setSessionSaga';
import getInstructor from './getInstructorSaga';
import reviewedClass from './reviewedClassSaga';
import addClass from './addClassSaga';
import getClassFuture from './getClassFutureSaga';
import updateclassRow from './updateClassRowSaga';
import currentSession from './currentSessionSaga';
import year from './yearSaga';
import season from './seasonSaga';
import archived from './archivedSaga';
import copyClass from './copyClassSaga';
import sendEmail from './sendEmailSaga';
import deleteclass from './deleteClassSaga';
import newSession from './newSessionSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    instructor(),
    addInstructor(),
    updateInstructor(),
    instructorSchedule(),
    classCount(),
    session(),
    getInstructor(),
    reviewedClass(),
    addClass(),
    getClassFuture(),
    updateclassRow(),
    currentSession(),
    year(),
    season(),
    archived(),
    copyClass(),
    sendEmail(),
    deleteclass(),
    newSession(),
  ]);
}
