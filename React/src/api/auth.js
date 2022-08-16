import http from "api/http";
import * as authService from "api/services/auth.service";
import {
  login as loginAction,
  logout as logoutAction,
} from "store/auth/actions";

const setAuthorizationHeaders = (access_token) => {
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

const delayRefresh = (expiresIn, dispatch) => {
  setTimeout(() => {
    refreshToken()
      .then(() => {
        dispatch(loginAction);
      })
      .catch((e) => {
        dispatch(logoutAction);
      });
  }, getExpireTime(expiresIn));
};

export const login = async (data, dispatch) => {
  try {
    const response = await authService.login(data);
    dispatch(loginAction);
    delayRefresh(response.data.expires_in, dispatch);
    setAuthorizationHeaders(response.data.access_token);
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export const refreshToken = async (dispatch) => {
  try {
    const response = await authService.refresh();
    setAuthorizationHeaders(response.data.access_token);
    delayRefresh(response.data.expires_in, dispatch);
    return response;
  } catch (e) {
    throw new Error(e);
  }
};
