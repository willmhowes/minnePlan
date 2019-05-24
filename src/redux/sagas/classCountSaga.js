import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* classCountSaga(action) {
  console.log('Hit instructor class count GET request', action);
  try {
    // Attempt to get class count
    const response = yield axios.get('/instructorSchedule/classcount');
    console.log(response);
    const newAction = { type: 'SET_CLASS_COUNT', payload: response.data };
    console.log(newAction);
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get instructor\'s class count', error);
  }
}

function* classCount() {
  yield takeLatest('GET_CLASS_COUNT', classCountSaga);
}

export default classCount;
