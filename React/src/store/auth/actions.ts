import * as authService from "api/services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "types/dispatch";
import http from "api/http";
import { AxiosResponse } from "axios";
import { iLogin } from "types/Login/login";

const setAuthorizationHeader = (accessToken: string) => {
  if (accessToken) {
    http.defaults.headers.Authorization = `JWT ${accessToken}`;
  } else {
    delete http.defaults.headers.Authorization;
  }
};

const getExpireTime = (expireTime: number) => {
  const expireTimeMs = expireTime * 1000;
  const offset = 10000;
  if (expireTimeMs < offset) return expireTimeMs * 0.5;
  return expireTimeMs - offset;
};

const setRefreshDelay = (
  expiresIn: number,
  dispatch: AppDispatch,
  getState: any
) => {
  setTimeout(() => {
    const { authSlice } = getState();

    if (authSlice.isAuthenticated) dispatch(refresh());
  }, getExpireTime(expiresIn));
};

export const login = createAsyncThunk<AxiosResponse, iLogin>(
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
    try {
      const result = await authService.refresh();
      setAuthorizationHeader(result.data.access_token);
      setRefreshDelay(result.data.expires_in, dispatch, getState);
      return result;
    } catch (e) {}
  }
);

export const logout = createAsyncThunk<boolean, undefined>(
  "auth/logout",
  async () => {
    const result = await authService.logout();
    setAuthorizationHeader("");
    return result;
  }
);

export const pended = createAsyncThunk("auth/pended", async () => {});
