import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* copyClassSaga(action) {
  console.log('Hit the copyClassSaga', action);
  try {
    // Attempt to add class to future session
    const response = yield axios.post('/api/classes/copy', action.payload);
    console.log(response);
  } catch (error) {
    console.log('Couldn\'t add class to future session', error);
  }
}

function* copyClass() {
  yield takeLatest('COPY_CLASS', copyClassSaga);
}

export default copyClass;
