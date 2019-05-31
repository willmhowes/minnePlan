import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* newSessionSaga(action) {
  console.log('Hit the new session saga', action.payload);
  try {
  // Attempt to create a new session
    const response = yield axios.put('/api/session', action.payload);
    console.log(response);
    const getAction = { type: 'GET_CLASSES' };
    console.log(getAction);
    yield put(getAction);
  } catch (error) {
    console.log('Could not create new session', error);
  }
}

function* newSession() {
  yield takeLatest('NEW_SESSION', newSessionSaga);
}

export default newSession;
