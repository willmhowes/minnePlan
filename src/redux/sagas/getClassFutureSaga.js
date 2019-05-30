import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* getClassFutureSaga(action) {
  console.log('Hit the get Class saga', action.payload);
  // const id = action.payload;
  try {
    // Attempt to get class
    const response = yield axios.get('/api/classes/future');
    console.log(response.data);
    const setClass = { type: 'SET_CLASSES', payload: response.data };
    console.log(setClass);
    yield put(setClass);
  } catch (error) {
    console.log('Could not get class', error);
  }
}

function* getClassFuture() {
  yield takeLatest('GET_CLASSES', getClassFutureSaga);
}

export default getClassFuture;
