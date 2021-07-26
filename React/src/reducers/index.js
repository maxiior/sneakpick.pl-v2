import filters from "reducers/filtersReducer";
import announs from "reducers/announsReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  filters,
  announs,
});

export default allReducers;
