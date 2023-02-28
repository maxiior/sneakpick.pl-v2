import { createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "store/items/actions";
import { turnOnPending } from "store/items/actions";

const initialState = {
  items: [],
  results: 0,
  max_price: 0,
  pending: true,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = [...action.payload.data.results];
      state.results = action.payload.data.count;
      state.max_price = action.payload.data.max_price;
      state.pending = false;
    });
    builder.addCase(turnOnPending, (state) => {
      state.pending = true;
    });
  },
});

export default itemsSlice.reducer;
