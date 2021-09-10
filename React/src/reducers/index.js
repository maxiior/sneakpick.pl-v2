import filtersReducer from "reducers/filtersReducer";
import announsReducer from "reducers/announsReducer";
import itemsSelectorReducer from "reducers/itemsSelectorReducer";
import addingItemReducer from "reducers/addingItemReducer";
import profileReducer from "reducers/profileReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  filtersReducer,
  announsReducer,
  itemsSelectorReducer,
  addingItemReducer,
  profileReducer,
});

export default allReducers;
