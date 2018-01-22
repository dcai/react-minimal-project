import { all, select, call, put, takeEvery, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function Api(username) {
  const url = `https://api.github.com/users/${username}`;
  return axios.get(url).then(res => res.data);
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
    const user = yield call(Api, action.payload.username);
    yield put({ type: 'USER_FETCH_SUCCEEDED', payload: { user } });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery('USER_FETCH_REQUESTED', fetchUser),
    takeEvery('*', function* logger(action) {
      const state = yield select();
      console.info('saga action', action);
      console.info('saga state', state);
    })
  ]);
}
