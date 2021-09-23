import http from "api/http";
import { endpoints } from "routes";

export const login = async (credentials) => {
  return await http.post(endpoints.TOKEN, {
    email: credentials.email,
    password: credentials.password,
  });
};

export const logout = async () => {
  await http.post(endpoints.BLACKLIST, {
    refresh_token: localStorage.getItem("refresh_token"),
  });
  return true;
};

export const register = async (credentials) => {
  return await http.post(endpoints.REGISTER, {
    first_name: credentials.first_name,
    last_name: credentials.last_name,
    city: credentials.city,
    email: credentials.email,
    password: credentials.password,
  });
};

export const refresh = async (refreshToken) => {
  return await http.post("/token/refresh/", { refresh: refreshToken });
};
