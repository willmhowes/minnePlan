import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* addInstructorSaga(action) {
    console.log('Hit the collection', action);
    try {
      // Attempt to get collection
      const response = yield axios.post('/api/instructor', action.payload)
      console.log(response);
    }
    catch (error) {
      console.log(`Couldn't add instructor`, error);
    }
}

function* addInstructor() {
    yield takeLatest('ADD_INSTRUCTOR', addInstructorSaga);
  }

export default addInstructor;
