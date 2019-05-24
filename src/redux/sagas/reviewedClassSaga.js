import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* reviewedClassSaga(action) {
  console.log('Hit the reviewed class saga', action.payload);
  // const id = action.payload.id;
  try {
  // Attempt to get brand
    const response = yield axios.put('/instructorSchedule');
    console.log(response);
    // TODO-- SEND GET CURRENT SESSION
    // const getAction = { type: 'GET_INSTRUCTORS', payload: id };
    // console.log(getAction);
    // yield put(getAction);
  } catch (error) {
    console.log('Could not update instructor', error);
  }
}

function* reviewedClass() {
  yield takeLatest('REVIEWED_CLASS', reviewedClassSaga);
}

export default reviewedClass;
