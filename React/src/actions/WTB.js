import axiosInstance from "axios/axios";

export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const fetchItems = (search) => (dispatch) => {
  dispatch({ type: FETCH_REQUEST });
  var url = `${search}`;

  return axiosInstance
    .get(url, {})
    .then((payload) => {
      dispatch({ type: FETCH_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: FETCH_FAILURE });
    });
};

export const openMobileFilters = () => {
  return {
    type: "OPEN_MOBILE_FILTERS",
  };
};

export const closeMobileFilters = () => {
  return {
    type: "CLOSE_MOBILE_FILTERS",
  };
};
