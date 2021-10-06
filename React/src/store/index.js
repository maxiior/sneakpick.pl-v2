import { configureStore } from "@reduxjs/toolkit";
import interfaceSlice from "store/interface/slice";
import authSlice from "store/auth/slice";
import profileSlice from "store/profile/slice";
import filtersSlice from "store/filters/slice";
import selectorsSlice from "store/selectors/slice";
import itemsSlice from "store/items/slice";
import creatorSlice from "store/creator/slice";

const store = configureStore({
  reducer: {
    profileSlice,
    interfaceSlice,
    authSlice,
    filtersSlice,
    selectorsSlice,
    itemsSlice,
    creatorSlice,
  },
});

export default store;
