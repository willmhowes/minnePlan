import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* deleteclassSaga(action) {
  const id = action.payload;
  try {
    // Attempt to get classRow
    const response = yield axios.delete(`/api/classes/${id}`);
    const getAction = { type: 'GET_CLASSES' };
    const getCurrent = { type: 'GET_CURRENT_SESSIONS' };
    yield put(getAction);
    yield put(getCurrent);
  } catch (error) {
  }
}

function* deleteclass() {
  yield takeLatest('DELETE_CLASS', deleteclassSaga);
}

export default deleteclass;
