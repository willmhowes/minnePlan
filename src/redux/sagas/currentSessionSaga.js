import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* currentSessionSaga(action) {
  console.log('Hit session GET request', action);
  try {
    // Attempt to get current sessions
    const response = yield axios.get('/api/session');
    console.log(response);
    const newAction = { type: 'SET_CURRENT_SESSIONS', payload: response.data };
    console.log(newAction);
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get sessions', error);
  }
}

function* currentSession() {
  yield takeLatest('GET_CURRENT_SESSIONS', currentSessionSaga);
}

export default currentSession;
