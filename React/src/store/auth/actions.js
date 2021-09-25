import * as authService from "api/services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "api/http";

const setAuthorizationHeader = (access_token) => {
  if (access_token) {
    http.defaults.headers.Authorization = `JWT ${access_token}`;
  } else {
    delete http.defaults.headers.Authorization;
  }
};

const getExpireTime = (expireTime) => {
  const expireTimeMs = expireTime * 1000;
  const offset = 10000;
  if (expireTimeMs < offset) return expireTimeMs * 0.5;
  return expireTimeMs - offset;
};

const setRefreshDelay = (expires_in, dispatch, getState) => {
  setTimeout(() => {
    const { authSlice } = getState();

    if (authSlice.isAuthenticated) {
      dispatch(refresh());
    }
  }, getExpireTime(expires_in));
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch, getState }) => {
    const result = await authService.login(credentials);
    setAuthorizationHeader(result.data.access_token);
    setRefreshDelay(result.data.expires_in, dispatch, getState);
    return result;
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { dispatch, getState }) => {
    const result = await authService.refresh();
    setAuthorizationHeader(result.data.access_token);
    setRefreshDelay(result.data.expires_in, dispatch, getState);
    return result;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const result = await authService.logout();
  setAuthorizationHeader("");
  return result;
});
