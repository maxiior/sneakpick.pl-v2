import { createSlice } from "@reduxjs/toolkit";
import { changeSelector } from "store/selectors/actions";

const initialState = {
  currentSelectors: {
    page: 1,
    limit: 24,
    ordering: 0,
  },
};

export const selectorsSlice = createSlice({
  name: "selectors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeSelector.fulfilled, (state, action) => {
      action.payload.forEach((element) => {
        state.currentSelectors[element.selectorType] = parseInt(element.value);
      });
    });
  },
});

export default selectorsSlice.reducer;
