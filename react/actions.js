import axios from 'axios';
import { createAction } from 'redux-actions';

const GITHUB_ACTION_PREFIX = 'ACTION_GITHUB_REPOS_FETCH';

export const ACTION_FETCH_DATA_LOADING = 'FETCH_DATA_LOADING';
export const ACTION_FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const ACTION_CLICK_BUTTON = 'CLICK_BUTTON';
export const FETCH_REPOS_LOADING = `${GITHUB_ACTION_PREFIX}_LOADING`;
export const FETCH_REPOS_LOADED = `${GITHUB_ACTION_PREFIX}_LOADED`;
export const FETCH_REPOS_FAILED = `${GITHUB_ACTION_PREFIX}_FAILED`;
export const FETCH_GITHUB_USER_REQUEST = 'FETCH_GITHUB_USER_REQUEST';

export const fetchGithubUser = payload => ({
  type: FETCH_GITHUB_USER_REQUEST,
  payload,
});

export const searchUsers = createAction('SEARCH_USERS');
export const receiveUsers = createAction('RECEIVE_SEARCH_USERS');

export const fetchGithubRepo = payload => ({
  type: FETCH_REPOS_LOADING,
  payload,
});

// redux thunk action
export const fetchData = payload => dispatch => {
  const { query, lang, perPage } = payload;
  const endpoint = 'https://api.github.com/search/repositories';
  dispatch({
    type: ACTION_FETCH_DATA_LOADING,
  });
  const url = `${endpoint}?per_page=${perPage}&q=${query}+language:${lang}&sort=stars`;
  return axios.get(url).then(res =>
    dispatch({
      type: ACTION_FETCH_DATA_SUCCESS,
      payload: res.data,
    }),
  );
};

export const clickButton = () => ({
  type: ACTION_CLICK_BUTTON,
});
