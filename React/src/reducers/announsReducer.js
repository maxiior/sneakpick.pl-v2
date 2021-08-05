import { FETCH_SUCCESS, FETCH_REQUEST, FETCH_FAILURE } from "actions/WTB";

const items = "items";

const initialState = {
  items: [],
};

const announsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        [items]: [...action.payload.data],
      };
    default:
      return state;
  }
};

export default announsReducer;
