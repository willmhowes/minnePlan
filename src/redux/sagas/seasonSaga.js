import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* seasonSaga(action) {
  console.log('Hit season GET request', action);
  try {
    // Attempt to get seasons
    const response = yield axios.get('/api/session/season');
    console.log(response);
    const newAction = { type: 'SET_SEASONS', payload: response.data };
    console.log(newAction);
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t get seasons', error);
  }
}

function* season() {
  yield takeLatest('GET_SEASONS', seasonSaga);
}

export default season;
