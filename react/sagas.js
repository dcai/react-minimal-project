import { throttle, all, select, call, put, takeEvery, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const GITHUB_API = 'https://api.github.com';
const GITHUB_ACTION_PREFIX = 'ACTION_GITHUB_REPOS_FETCH';

import { FETCH_REPOS_LOADING, FETCH_REPOS_FAILED, FETCH_REPOS_LOADED } from './actions.js';

const api = url => axios.get(url).then(res => res.data);

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
    const url = `${GITHUB_API}/users/${action.payload.username}`;
    const user = yield call(api, url);
    yield put({ type: 'USER_FETCH_SUCCEEDED', payload: { user } });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* fetchRepositories(action) {
  const { query, lang, per_page } = action.payload;
  try {
    const endpoint = `${GITHUB_API}/search/repositories`;
    const url = `${endpoint}?per_page=${per_page}&q=${query}+language:${lang}&sort=stars`;
    const repos = yield call(api, url);
    yield put({ type: FETCH_REPOS_LOADED, payload: repos });
  } catch (e) {
    yield put({ type: FETCH_REPOS_FAILED, message: e.message });
  }
}

export default function* rootSaga() {
  yield all([
    throttle(1000, FETCH_REPOS_LOADING, fetchRepositories),
    takeEvery('USER_FETCH_REQUESTED', fetchUser),
    takeEvery('*', function* logger(action) {
      const state = yield select();
      console.info('saga action', action);
      console.info('saga state', state);
    })
  ]);
}
