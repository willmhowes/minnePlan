import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* updateclassRowSaga(action) {
  console.log('Hit the update classRow saga', action.payload);
  const id = action.payload.id;
  try {
    // Attempt to get classRow
    const response = yield axios.put(`/api/classes/${id}`, action.payload);
    console.log(response);
    const getAction = { type: 'GET_CLASSES' };
    console.log(getAction);
    yield put(getAction);
    const getCurrentAction = { type: 'GET_CURRENT_SESSIONS' };
    console.log(getCurrentAction);
    yield put(getCurrentAction);
  } catch (error) {
    console.log('Could not update classRow', error);
  }
}

function* updateclassRow() {
  yield takeLatest('UPDATE_CLASS_ROW', updateclassRowSaga);
}

export default updateclassRow;
