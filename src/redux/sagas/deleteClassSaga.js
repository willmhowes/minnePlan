import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* deleteclassSaga(action) {
  const id = action.payload;
  try {
    // Attempt to delete specific class
    yield axios.delete(`/api/classes/${id}`);
    const getAction = { type: 'GET_CLASSES' };
    const getCurrent = { type: 'GET_CURRENT_SESSIONS' };
    yield put(getAction);
    yield put(getCurrent);
  } catch (error) {
    console.log('Could not delete class', error);
  }
}

function* deleteclass() {
  yield takeLatest('DELETE_CLASS', deleteclassSaga);
}

export default deleteclass;
