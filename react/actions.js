export const ACTION_FETCH_DATA_LOADING = 'FETCH_DATA_LOADING';
export const ACTION_FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const ACTION_CLICK_BUTTON = 'CLICK_BUTTON';

export const fetchData = () => dispatch => {
  dispatch({
    type: ACTION_FETCH_DATA_LOADING
  });
  return new Promise(resolve => resolve({
    status: 'ok',
    payload: 'cool data'
  })).then(data => dispatch({
    type: ACTION_FETCH_DATA_SUCCESS,
    data
  }));
};

export const clickButton = () => ({
  type: ACTION_CLICK_BUTTON
})
