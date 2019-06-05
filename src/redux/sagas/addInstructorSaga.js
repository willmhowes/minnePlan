import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* addInstructorSaga(action) {
  try {
    // Attempt to add instructor
    const response = yield axios.post('/api/instructor', action.payload);
  } catch (error) {
    console.log('Couldn\'t add instructor', error);
  }
}

function* addInstructor() {
  yield takeLatest('ADD_INSTRUCTOR', addInstructorSaga);
}

export default addInstructor;
