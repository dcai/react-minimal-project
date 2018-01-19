import {combineReducers} from 'redux';
import {ACTION_CLICK_BUTTON, ACTION_FETCH_DATA_SUCCESS} from './actions.js';

const rootReducer = combineReducers({
  data: (state, action) => {
    if (action.type === ACTION_CLICK_BUTTON) {
      return Object.assign({}, state, {
        counter: state.counter + 1
      });
    }
    return state || {};
  },
  githubData: (state, action) => {
    if (action.type === ACTION_FETCH_DATA_SUCCESS) {
      return Object.assign({}, state, action.payload);
    }

    return state || {};
  },
  ui: (state, action) => {
    return state || {};
  }
});

export default rootReducer;
