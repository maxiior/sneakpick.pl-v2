import {
  PROFILE_FETCH_ITEMS_SUCCESS,
  PROFILE_FETCH_ITEMS_REQUEST,
  PROFILE_FETCH_ITEMS_FAILURE,
  PROFILE_FETCH_USER_REQUEST,
  PROFILE_FETCH_USER_SUCCESS,
  PROFILE_FETCH_USER_FAILURE,
} from "actions/profile";

const items = "items";
const results = "results";

const initialState = {
  items: [],
  results: 0,
  user: {
    first_name: "",
    last_name: "",
    city: "",
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        [items]: [...action.payload.data.results],
        [results]: action.payload.data.count,
      };
    case PROFILE_FETCH_USER_SUCCESS:
      return {
        ...state,
        user: {
          first_name: action.payload.data.first_name,
          last_name: action.payload.data.last_name,
          city: action.payload.data.city,
        },
      };
    default:
      return state;
  }
};

export default profileReducer;
