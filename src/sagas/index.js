import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
function* fetchHistory() {
  // const json = yield fetch('https://api.spacexdata.com/v3/history');
  const json = yield axios(
    'https://api.spacexdata.com/v3/history');
  console.log('hujadgudbnuj ', json)
  yield put({ type: "HISTORY_RECEIVED", json: json.data, });
}
function* fetchLaunches() {
  const json = yield axios(
    'https://api.spacexdata.com/v3/launches');
  console.log('hujadgudbnuj ', json)
  yield put({ type: "LAUNCHES_RECEIVED", json: json.data, });
}
function* fetchRockets() {
  const json = yield axios(
    'https://api.spacexdata.com/v3/rockets');
  console.log('hujadgudbnuj ', json)
  yield put({ type: "ROCKETS_RECEIVED", json: json.data, });
}
function* actionWatcher() {
  yield takeLatest('GET_LAUNCHES', fetchLaunches),
    yield takeLatest('GET_HISTORY', fetchHistory),
    yield takeLatest('GET_ROCKETS', fetchRockets)
}
export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}