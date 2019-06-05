import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* instructorSaga() {
  try {
    // Attempt to get instructors
    const response = yield axios.get('/api/instructor');
    const newAction = { type: 'SET_INSTRUCTORS', payload: response.data };
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get instructors', error);
  }
}

function* instructor() {
  yield takeLatest('GET_INSTRUCTORS', instructorSaga);
}

export default instructor;
