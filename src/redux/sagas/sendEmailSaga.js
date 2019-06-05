import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* sendEmailSaga(action) {
  try {
    // Attempt to get instructor
    const response = yield axios.post('/send/email', { email: action.payload });
    const newAction = { type: 'GET_CLASSES', payload: response.data };
    yield put(newAction);
  } catch (error) {
  }
}

function* sendEmail() {
  yield takeLatest('SEND_EMAIL', sendEmailSaga);
}

export default sendEmail;
