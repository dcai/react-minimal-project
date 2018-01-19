import axios from 'axios';

export const ACTION_FETCH_DATA_LOADING = "FETCH_DATA_LOADING";
export const ACTION_FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const ACTION_CLICK_BUTTON = "CLICK_BUTTON";

export const fetchData = () => dispatch => {
  dispatch({
    type: ACTION_FETCH_DATA_LOADING
  });
  const url =
        'https://api.github.com/search/repositories?q=tetris+language:js&sort=stars';
  return axios.get(url).then(res =>
    dispatch({
      type: ACTION_FETCH_DATA_SUCCESS,
      payload: res.data
    })
  );
};

export const clickButton = () => ({
  type: ACTION_CLICK_BUTTON
});
