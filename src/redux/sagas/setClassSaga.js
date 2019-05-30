import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* classSaga(action) {
  console.log('Hit class GET request', action);
  try {
    // Attempt to get instructors
    const response = yield axios.get('/api/classes');
    console.log(response);
    const newAction = { type: 'SET_CLASSES', payload: response.data };
    console.log(newAction);
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get classes', error);
  }
}

function* classes() {
  yield takeLatest('GET_CLASSES', classSaga);
}

export default classes;
