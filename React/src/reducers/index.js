import filtersReducer from "reducers/filtersReducer";
import announsReducer from "reducers/announsReducer";
import itemsSelectorReducer from "reducers/itemsSelectorReducer";
import addingItemReducer from "reducers/addingItemReducer";
import profileReducer from "reducers/profileReducer";
import interfaceReducer from "reducers/interfaceReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  filtersReducer,
  announsReducer,
  itemsSelectorReducer,
  addingItemReducer,
  profileReducer,
  interfaceReducer,
});

export default allReducers;
