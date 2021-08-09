import filtersReducer from "reducers/filtersReducer";
import announsReducer from "reducers/announsReducer";
import itemsSelectorReducer from "reducers/itemsSelectorReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  filtersReducer,
  announsReducer,
  itemsSelectorReducer,
});

export default allReducers;
