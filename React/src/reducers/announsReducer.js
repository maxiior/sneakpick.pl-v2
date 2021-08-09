import { FETCH_SUCCESS, FETCH_REQUEST, FETCH_FAILURE } from "actions/WTB";

const items = "items";
const results = "results";

const initialState = {
  items: [],
  results: 0,
};

const announsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        [items]: [...action.payload.data.results],
        [results]: action.payload.data.count,
      };
    default:
      return state;
  }
};

export default announsReducer;
