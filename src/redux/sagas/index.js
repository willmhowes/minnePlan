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
import classes from './setClassSaga';
import updateclassRow from './updateClassRowSaga';

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
  ]);
}
