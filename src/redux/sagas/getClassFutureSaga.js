import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* getClassFutureSaga(action) {
  // const id = action.payload;
  try {
    // Attempt to get class for future session
    const response = yield axios.get('/api/classes/future');
    const setClass = { type: 'SET_CLASSES', payload: response.data };
    yield put(setClass);
  } catch (error) {
  }
}

function* getClassFuture() {
  yield takeLatest('GET_CLASSES', getClassFutureSaga);
}

export default getClassFuture;
