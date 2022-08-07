import http from "api/http";
import { endpoints } from "routes";

export const fetchItems = async (credentials) => {
  return await http.get(
    endpoints.GET_ALL_ITEMS.replace("{filters}", credentials)
  );
};

export const fetchFollowedItems = async () => {
  return await http.get(endpoints.FOLLOWED_ITEMS);
};

export const fetchSingleItem = async (credentials) => {
  return await http.get(endpoints.GET_SINGLE_ITEM.replace("{id}", credentials));
};

export const addItem = async (credentials) => {
  return await http.post(credentials);
};

export const removeItem = async (credentials) => {
  return await http.delete(
    endpoints.DELETE_FOLLOWED_ITEMS.replace("{id}", credentials)
  );
};
