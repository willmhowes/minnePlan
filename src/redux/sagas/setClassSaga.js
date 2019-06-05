import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* classSaga(action) {
  try {
    // Attempt update classes
    const response = yield axios.get('/api/classes');
    const newAction = { type: 'SET_CLASSES', payload: response.data };
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get classes', error);
  }
}

function* classes() {
  yield takeLatest('GET_CLASSES', classSaga);
}

export default classes;
