import http from "api/http";
import { endpoints } from "routes";

export const fetchItems = async (id) => {
  const { data } = await http.get(endpoints.USER_PRODUCTS_LIST + id);
  return data;
};

export const fetchUser = async (id) => {
  const { data } = await http.get(endpoints.USER + id);
  return data;
};
