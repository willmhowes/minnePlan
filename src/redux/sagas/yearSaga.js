import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* yearSaga() {
  try {
    // Attempt to get years
    const response = yield axios.get('/api/session/year');
    const newAction = { type: 'SET_YEARS', payload: response.data };
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get years', error);
  }
}

function* year() {
  yield takeLatest('GET_YEARS', yearSaga);
}

export default year;
