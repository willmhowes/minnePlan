import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* instructorScheduleSaga(action) {
  console.log('Hit instructor schedule GET request', action);
  try {
    // Attempt to get instructors
    const response = yield axios.get('/instructorSchedule');
    console.log(response);
    const newAction = { type: 'SET_INSTRUCTOR_SCHEDULE', payload: response.data };
    console.log(newAction);
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get instructor\'s schedule', error);
  }
}

function* instructorSchedule() {
  yield takeLatest('GET_INSTRUCTOR_SCHEDULE', instructorScheduleSaga);
}

export default instructorSchedule;
