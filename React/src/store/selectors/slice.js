import { createSlice } from "@reduxjs/toolkit";
import { changeSelector } from "store/selectors/actions";

const initialState = {
  currentSelectors: {
    sorting: 0,
    pagination: 24,
    page: 1,
  },
};

export const selectorsSlice = createSlice({
  name: "selectors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeSelector.fulfilled, (state, action) => {
      state.currentSelectors[action.payload.type] = action.payload.value;
    });
  },
});

export default selectorsSlice.reducer;
