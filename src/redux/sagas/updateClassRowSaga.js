import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* updateclassRowSaga(action) {
  const id = action.payload.id;
  try {
    // Attempt to get classRow
    const response = yield axios.put(`/api/classes/${id}`, action.payload);
    const getAction = { type: 'GET_CLASSES' };
    yield put(getAction);
    const getCurrentAction = { type: 'GET_CURRENT_SESSIONS' };
    yield put(getCurrentAction);
  } catch (error) {
    console.log('Could not update classRow', error);
  }
}

function* updateclassRow() {
  yield takeLatest('UPDATE_CLASS_ROW', updateclassRowSaga);
}

export default updateclassRow;
