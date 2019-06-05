import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* newSessionSaga(action) {
  try {
  // Attempt to create a new session, by updating all 'current' sessions (should only be 1)
  // to 'archived' session and all 'planning' sessions (should also only be 1 session) to 'current'
    const response = yield axios.put('/api/session', action.payload);
    const getAction = { type: 'GET_CLASSES' };
    yield put(getAction);
  } catch (error) {
    console.log('Could not create new session', error);
  }
}

function* newSession() {
  yield takeLatest('NEW_SESSION', newSessionSaga);
}

export default newSession;
