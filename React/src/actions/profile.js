import axiosInstance from "axios/axios";
import { endpoints } from "routes";

export const PROFILE_FETCH_ITEMS_REQUEST = "PROFILE_FETCH_ITEMS_REQUEST";
export const PROFILE_FETCH_ITEMS_SUCCESS = "PROFILE_FETCH_ITEMS_SUCCESS";
export const PROFILE_FETCH_ITEMS_FAILURE = "PROFILE_FETCH_ITEMS_FAILURE";

export const PROFILE_FETCH_USER_REQUEST = "PROFILE_FETCH_USER_REQUEST";
export const PROFILE_FETCH_USER_SUCCESS = "PROFILE_FETCH_USER_SUCCESS";
export const PROFILE_FETCH_USER_FAILURE = "PROFILE_FETCH_USER_FAILURE";

export const fetchItems = (user) => (dispatch) => {
  dispatch({ type: PROFILE_FETCH_ITEMS_REQUEST });

  return axiosInstance
    .get(endpoints.USER_PRODUCTS_LIST + user, {})
    .then((payload) => {
      dispatch({ type: PROFILE_FETCH_ITEMS_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: PROFILE_FETCH_ITEMS_FAILURE });
    });
};

export const fetchUser = (user) => (dispatch) => {
  dispatch({ type: PROFILE_FETCH_USER_REQUEST });

  return axiosInstance
    .get(endpoints.USER + user, {})
    .then((payload) => {
      dispatch({ type: PROFILE_FETCH_USER_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: PROFILE_FETCH_USER_FAILURE });
    });
};
