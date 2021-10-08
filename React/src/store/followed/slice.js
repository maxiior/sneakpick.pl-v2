import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFollowedItems,
  removeFollowedItem,
  addFollowedItem,
} from "store/followed/actions";

const initialState = {
  items: [],
  results: 0,
};

export const followedSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFollowedItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.results = action.payload.length;
    });
    builder.addCase(removeFollowedItem.fulfilled, (state, action) => {
      state.items = state.items.filter((e) => e.id !== action.payload && e);
      state.results -= 1;
    });
    builder.addCase(addFollowedItem.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
      state.results += 1;
    });
  },
});

export default followedSlice.reducer;
