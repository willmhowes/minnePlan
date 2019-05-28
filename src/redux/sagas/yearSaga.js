import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* yearSaga(action) {
  console.log('Hit year GET request', action);
  try {
    // Attempt to get years
    const response = yield axios.get('/api/session/year');
    console.log(response);
    const newAction = { type: 'SET_YEARS', payload: response.data };
    console.log(newAction);
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get years', error);
  }
}

function* year() {
  yield takeLatest('GET_YEARS', yearSaga);
}

export default year;
