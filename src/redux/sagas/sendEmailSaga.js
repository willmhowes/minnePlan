import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* sendEmailSaga(action) {
  console.log('Hit the sendEmailSaga', action);
  try {
    // Attempt to get instructor
    const response = yield axios.post('/send/email', { email: action.payload });
    console.log(response);
    const newAction = { type: 'GET_CLASSES', payload: response.data };
    yield put(newAction);
  } catch (error) {
    console.log('Couldn\'t send email', error);
  }
}

function* sendEmail() {
  yield takeLatest('SEND_EMAIL', sendEmailSaga);
}

export default sendEmail;
