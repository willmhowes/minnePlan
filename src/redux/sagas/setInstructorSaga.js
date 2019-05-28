import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* instructorSaga(action) {
  console.log('Hit instructor GET request', action);
  try {
    // Attempt to get instructors
    const response = yield axios.get('/api/instructor');
    console.log(response);
    const newAction = { type: 'SET_INSTRUCTORS', payload: response.data };
    console.log(newAction);
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get instructors', error);
  }
}

function* instructor() {
  yield takeLatest('GET_INSTRUCTORS', instructorSaga);
}

export default instructor;
