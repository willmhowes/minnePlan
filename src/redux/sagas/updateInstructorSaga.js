import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* updateInstructorSaga(action) {
  console.log('Hit the update Instructor saga', action.payload);
  const id = action.payload.id;
  try {
  // Attempt to get brand
    const response = yield axios.put(`/api/instructor${id}`, action.payload);
    console.log(response);
    const getAction = { type: 'GET_INSTRUCTORS', payload: id };
    console.log(getAction);
    yield put(getAction);
  }
  catch (error) {
    console.log('Could not update instructor', error);
  }
}

function* updateInstructor() {
  yield takeLatest('UPDATE_INSTRUCTOR', updateInstructorSaga);
}

export default updateInstructor;
