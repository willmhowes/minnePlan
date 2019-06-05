import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* sessionSaga(action) {
  try {
    // Attempt to get all sessions
    const response = yield axios.get('/api/session');
    const newAction = { type: 'SET_SESSIONS', payload: response.data };
    yield put(newAction);
  } catch (error) {
  }
}

function* session() {
  yield takeLatest('GET_SESSIONS', sessionSaga);
}

export default session;
