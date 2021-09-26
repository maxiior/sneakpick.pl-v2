import filtersReducer from "reducers/filtersReducer";
import announsReducer from "reducers/announsReducer";
import itemsSelectorReducer from "reducers/itemsSelectorReducer";
import addingItemReducer from "reducers/addingItemReducer";
import { combineReducers } from "redux";
import interfaceSlice from "store/interface/slice";
import authSlice from "store/auth/slice";
import profileSlice from "store/profile/slice";
import filtersSlice from "store/filters/slice";

const allReducers = combineReducers({
  filtersReducer,
  announsReducer,
  itemsSelectorReducer,
  addingItemReducer,
  profileSlice,
  interfaceSlice,
  authSlice,
  filtersSlice,
});

export default allReducers;
