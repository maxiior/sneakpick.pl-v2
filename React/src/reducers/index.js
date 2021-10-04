import addingItemReducer from "reducers/addingItemReducer";
import { combineReducers } from "redux";
import interfaceSlice from "store/interface/slice";
import authSlice from "store/auth/slice";
import profileSlice from "store/profile/slice";
import filtersSlice from "store/filters/slice";
import selectorsSlice from "store/selectors/slice";
import itemsSlice from "store/items/slice";

const allReducers = combineReducers({
  addingItemReducer,
  profileSlice,
  interfaceSlice,
  authSlice,
  filtersSlice,
  selectorsSlice,
  itemsSlice,
});

export default allReducers;
