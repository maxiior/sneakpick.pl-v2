import axiosInstance from "axios/axios";

export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const fetchItems = (limit, offset, search) => (dispatch) => {
  dispatch({ type: FETCH_REQUEST });
  var url;

  if (search) url = `search/${search}&limit=${limit}&offset=${offset}`;
  else url = `?limit=${limit}&offset=${offset}`;

  return axiosInstance
    .get(url, {})
    .then((payload) => {
      dispatch({ type: FETCH_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: FETCH_FAILURE });
    });
};
