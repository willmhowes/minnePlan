import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* newSessionSaga(action) {
  try {
  // Attempt to create a new session
    const response = yield axios.put('/api/session', action.payload);
    const getAction = { type: 'GET_CLASSES' };
    yield put(getAction);
  } catch (error) {
  }
}

function* newSession() {
  yield takeLatest('NEW_SESSION', newSessionSaga);
}

export default newSession;
