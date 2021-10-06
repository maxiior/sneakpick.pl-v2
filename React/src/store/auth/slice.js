import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refresh } from "store/auth/actions";

const initialState = {
  isAuthenticated: false,
  user_id: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user_id = action.payload.data.id;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user_id = action.payload.data.id;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user_id = null;
    });
  },
});

export default authSlice.reducer;
