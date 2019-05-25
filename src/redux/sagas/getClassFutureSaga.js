import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* getClassFutureSaga(action) {
  console.log('Hit the get Class saga', action.payload);
  const id = action.payload;
  try {
    // Attempt to get class
    const response = yield axios.get(`/api/add-new-class/${id}`);
    console.log(response.data[0]);
    const setClass = { type: 'SET_CLASS', payload: response.data[0] };
    console.log(setClass);
    yield put(setClass);
  } catch (error) {
    console.log('Could not get class', error);
  }
}

function* getClassFuture() {
  yield takeLatest('GET_CLASS', getClassFutureSaga);
}

export default getClassFuture;
