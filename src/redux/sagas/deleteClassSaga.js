import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* deleteclassSaga(action) {
  console.log('Hit the delete class saga', action.payload);
  const id = action.payload;
  try {
    // Attempt to get classRow
    const response = yield axios.delete(`/api/classes/${id}`);
    console.log(response);
    const getAction = { type: 'GET_CLASSES' };
    console.log(getAction);
    yield put(getAction);
  } catch (error) {
    console.log('Could not delete class', error);
  }
}

function* deleteclass() {
  yield takeLatest('DELETE_CLASS', deleteclassSaga);
}

export default deleteclass;
