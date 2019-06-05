import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* instructorScheduleSaga(action) {
  try {
    // Attempt to get instructors scheduled classes
    const response = yield axios.get('/instructorSchedule');
    const newAction = { type: 'SET_INSTRUCTOR_SCHEDULE', payload: response.data };
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get instructor\'s schedule', error);
  }
}

function* instructorSchedule() {
  yield takeLatest('GET_INSTRUCTOR_SCHEDULE', instructorScheduleSaga);
}

export default instructorSchedule;
