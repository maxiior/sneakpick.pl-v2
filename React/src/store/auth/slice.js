import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refresh, pended } from "store/auth/actions";

const initialState = {
  pending: true,
  isAuthenticated: false,
  user_id: "",
  email: "",
  role: "user",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.pending = false;
      state.isAuthenticated = true;
      state.user_id = action.payload.data.id;
      state.email = action.payload.data.email;
      state.role = action.payload.data.role;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.pending = false;
      state.isAuthenticated = true;
      state.user_id = action.payload.data.id;
      state.email = action.payload.data.email;
      state.role = action.payload.data.role;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.pending = false;
      state.isAuthenticated = false;
      state.user_id = null;
    });
    builder.addCase(pended.fulfilled, (state) => {
      state.pending = false;
      state.isAuthenticated = false;
      state.user_id = null;
    });
  },
});

export default authSlice.reducer;
