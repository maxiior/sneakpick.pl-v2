import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refresh } from "store/auth/actions";

const initialState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(refresh.fulfilled, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
