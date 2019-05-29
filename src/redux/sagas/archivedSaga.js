import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* archivedSaga(action) {
  console.log('Hit the get archived saga', action);
  try {
    // Attempt to get classes
    const response = yield axios.get(`/api/classes/history/${action.payload.season}/${action.payload.year}`);
    console.log(response.data);
    const setArchived = { type: 'SET_ARCHIVED', payload: response.data };
    console.log(setArchived);
    yield put(setArchived);
  } catch (error) {
    console.log('Could not get ARCHIVED', error);
  }
}

function* archived() {
  yield takeLatest('GET_ARCHIVED', archivedSaga);
}

export default archived;
