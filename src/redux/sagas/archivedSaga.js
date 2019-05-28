import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* archivedSaga(action) {
  console.log('Hit the get archived saga', action);
  try {
    // Attempt to get brand
    const response = yield axios.get('/api/classes/history');
    console.log(response);
    const setArchived = { type: 'SET_ARCHVED', payload: response };
    console.log(setArchived);
    yield put(setArchived);
  } catch (error) {
    console.log('Could not get ARCHIVED', error);
  }
}

function* archived() {
  yield takeLatest('GET_ARCHVED', archivedSaga);
}

export default archived;
