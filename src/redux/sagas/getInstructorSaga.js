import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* getInstructorSaga(action) {
  console.log('Hit the get Instructor saga', action.payload);
  const id = action.payload;
  try {
    // Attempt to get brand
    const response = yield axios.get(`/api/instructor/${id}`);
    console.log(response.data[0]);
    const setInstructor = { type: 'SET_INSTRUCTOR', payload: response.data[0] };
    console.log(setInstructor);
    yield put(setInstructor);
  } catch (error) {
    console.log('Could not get instructor', error);
  }
}

function* getInstructor() {
  yield takeLatest('GET_INSTRUCTOR', getInstructorSaga);
}

export default getInstructor;
