import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* classCountSaga(action) {
  try {
    // Attempt to get class count
    const response = yield axios.get('/instructorSchedule/classcount');
    const newAction = { type: 'SET_CLASS_COUNT', payload: response.data };
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get instructor\'s class count', error);
  }
}

function* classCount() {
  yield takeLatest('GET_CLASS_COUNT', classCountSaga);
}

export default classCount;
