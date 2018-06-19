import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';
import {
  receiveUsers,
  FETCH_REPOS_LOADED,
  FETCH_REPOS_LOADING,
  ACTION_CLICK_BUTTON,
} from './actions.js';

const rootReducer = combineReducers({
  users: (state, action) => {
    if (action.type === `${receiveUsers}`) {
      return Object.assign({}, state, action.payload.data);
    }
    return state || {};
  },
  data: (state, action) => {
    if (action.type === ACTION_CLICK_BUTTON) {
      return Object.assign({}, state, {
        counter: state.counter + 1,
      });
    }
    return state || {};
  },
  githubUser: (state, action) => {
    if (action.type === 'USER_FETCH_SUCCEEDED') {
      return Object.assign({}, state, action.payload.user);
    }

    return state || {};
  },
  githubRepoData: (state, action) => {
    if (action.type === FETCH_REPOS_LOADED) {
      return Object.assign({}, state, action.payload);
    }
    return state || {};
  },
  ui: (state, action) => {
    if (action.type === FETCH_REPOS_LOADING) {
      return Object.assign({}, state, {
        loading: true,
      });
    }
    if (action.type === FETCH_REPOS_LOADED) {
      return Object.assign({}, state, {
        loading: false,
      });
    }
    return state || {};
  },
});

export default rootReducer;
