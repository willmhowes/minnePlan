import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* updateInstructorSaga(action) {
  const id = action.payload.id;
  try {
  // Attempt to get instructor
    yield axios.put(`/api/instructor/${id}`, action.payload);
    const getAction = { type: 'GET_INSTRUCTORS', payload: id };
    yield put(getAction);
  } catch (error) {
    console.log('Could not update instructor', error);
  }
}

function* updateInstructor() {
  yield takeLatest('UPDATE_INSTRUCTOR', updateInstructorSaga);
}

export default updateInstructor;
