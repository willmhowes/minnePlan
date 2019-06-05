import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* reviewedClassSaga(action) {
  try {
  // Attempt to get brand
    const response = yield axios.put('/instructorSchedule', action.payload);
  } catch (error) {
    console.log('Could not update instructor', error);
  }
}

function* reviewedClass() {
  yield takeLatest('REVIEWED_CLASS', reviewedClassSaga);
}

export default reviewedClass;
