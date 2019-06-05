import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* getInstructorSaga(action) {
  const id = action.payload;
  try {
    // Attempt to get specific instructor
    const response = yield axios.get(`/api/instructor/${id}`);
    const setInstructor = { type: 'SET_INSTRUCTOR', payload: response.data[0] };
    yield put(setInstructor);
  } catch (error) {
    console.log('Could not get instructor', error);
  }
}

function* getInstructor() {
  yield takeLatest('GET_INSTRUCTOR', getInstructorSaga);
}

export default getInstructor;
