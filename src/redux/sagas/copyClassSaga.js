import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* copyClassSaga(action) {
  try {
    // Attempt to add class to future session
    const response = yield axios.post('/api/classes/copy', action.payload);
  } catch (error) {
    console.log('Couldn\'t add class to future session', error);
  }
}

function* copyClass() {
  yield takeLatest('COPY_CLASS', copyClassSaga);
}

export default copyClass;
