import { createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "store/items/actions";

const initialState = {
  items: [],
  results: 0,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = [...action.payload.data.results];
      state.results = action.payload.data.count;
    });
  },
});

export default itemsSlice.reducer;
