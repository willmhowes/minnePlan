import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* instructorSaga(action) {
  try {
    // Attempt to get all instructors
    const response = yield axios.get('/api/instructor');
    const newAction = { type: 'SET_INSTRUCTORS', payload: response.data };
    yield put(newAction);
  } catch (error) {
  }
}

function* instructor() {
  yield takeLatest('GET_INSTRUCTORS', instructorSaga);
}

export default instructor;
