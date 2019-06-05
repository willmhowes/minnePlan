import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* currentSessionSaga(action) {
  try {
    // Attempt to get current session classes
    const response = yield axios.get('/api/classes/current');
    const newAction = { type: 'SET_CURRENT_SESSIONS', payload: response.data };
    yield put(newAction);
  } catch (error) {
  }
}

function* currentSession() {
  yield takeLatest('GET_CURRENT_SESSIONS', currentSessionSaga);
}

export default currentSession;
