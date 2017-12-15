import {combineReducers} from 'redux';
import {ACTION_CLICK_BUTTON} from './actions.js';

const rootReducer = combineReducers({
  data: (state, action) => {
    if (action.type === ACTION_CLICK_BUTTON) {
      return Object.assign({}, state, {
        counter: state.counter + 1
      });
    }
    return state || {};
  },
  ui: (state, action) => {
    return state || {};
  }
});

export default rootReducer;
