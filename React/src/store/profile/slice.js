import { createSlice } from "@reduxjs/toolkit";
import { fetchItems, fetchUser } from "store/profile/actions";

const initialState = {
  items: [],
  results: 0,
  user: {
    first_name: "",
    last_name: "",
    city: "",
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.results = action.payload.results;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user.first_name = action.payload.first_name;
      state.user.last_name = action.payload.last_name;
      state.user.city = action.payload.city;
    });
  },
});

export default profileSlice.reducer;
