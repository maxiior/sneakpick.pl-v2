import axiosInstance from "axios/axios";

export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const fetchItems = () => (dispatch, getState) => {
  dispatch({ type: FETCH_REQUEST });

  return axiosInstance
    .get("", {})
    .then((payload) => {
      dispatch({ type: FETCH_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: FETCH_FAILURE });
    });
};
