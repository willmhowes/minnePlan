import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* sessionSaga(action) {
  console.log('Hit session GET request', action);
  try {
    // Attempt to get instructors
    const response = yield axios.get('/api/session');
    console.log(response);
    const newAction = { type: 'SET_SESSIONS', payload: response.data };
    console.log(newAction);
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get sessions', error);
  }
}

function* session() {
  yield takeLatest('GET_SESSIONS', sessionSaga);
}

export default session;
