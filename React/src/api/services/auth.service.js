import http from "api/http";
import { endpoints } from "routes";

export const login = async (credentials) => {
  return await http.post(endpoints.LOGIN, {
    email: credentials.email,
    password: credentials.password,
  });
};

export const logout = async () => {
  await http.post("/users/logout/");
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

export const refresh = async () => {
  return await http.post("/users/refresh/", {});
};
