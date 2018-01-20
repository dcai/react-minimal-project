import axios from 'axios';

export const ACTION_FETCH_DATA_LOADING = 'FETCH_DATA_LOADING';
export const ACTION_FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const ACTION_CLICK_BUTTON = 'CLICK_BUTTON';

export const fetchData = payload => dispatch => {
  const { query, lang, per_page } = payload;
  const endpoint = 'https://api.github.com/search/repositories';
  dispatch({
    type: ACTION_FETCH_DATA_LOADING
  });
  const url = `${endpoint}?per_page=${per_page}&q=${query}+language:${lang}&sort=stars`;
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
