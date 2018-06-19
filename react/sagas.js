import { throttle, all, select, call, put, takeEvery } from 'redux-saga/effects';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import axios from 'axios';
import {
  receiveUsers,
  searchUsers,
  FETCH_GITHUB_USER_REQUEST,
  FETCH_REPOS_LOADING,
  FETCH_REPOS_FAILED,
  FETCH_REPOS_LOADED,
} from './actions.js';

const GITHUB_API = 'https://api.github.com';
const GITHUB_ACTION_PREFIX = 'ACTION_GITHUB_REPOS_FETCH';

const api = url => axios.get(url).then(res => res.data);

function* fetchGithubUser(action) {
  try {
    const url = `${GITHUB_API}/users/${action.payload.username}`;
    const user = yield call(api, url);
    yield put({ type: 'USER_FETCH_SUCCEEDED', payload: { user } });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* fetchRepositories(action) {
  const { query, lang, perPage } = action.payload;
  try {
    const endpoint = `${GITHUB_API}/search/repositories`;
    const url = `${endpoint}?per_page=${perPage}&q=${query}+language:${lang}&sort=stars`;
    const repos = yield call(api, url);
    yield put({ type: FETCH_REPOS_LOADED, payload: repos });
  } catch (e) {
    yield put({ type: FETCH_REPOS_FAILED, message: e.message });
  }
}

function* searchUsersSaga(action) {
  const client = new ApolloClient({
    uri: '/graphql',
  });

  const { name } = action.payload;
  const data = yield call(client.query, {
    query: gql`
      {
        users(name: "${name}") {
          uuid
          name
          phone
          email
          avatar
          color
        }
      }
    `,
  });
  yield put(receiveUsers(data));
}

export default function* rootSaga() {
  yield all([
    throttle(1000, FETCH_REPOS_LOADING, fetchRepositories),
    takeEvery(FETCH_GITHUB_USER_REQUEST, fetchGithubUser),
    takeEvery(`${searchUsers}`, searchUsersSaga),
    takeEvery('*', function* logger(action) {
      const state = yield select();
      console.info('saga action', action);
      console.info('saga state', state);
    }),
  ]);
}
