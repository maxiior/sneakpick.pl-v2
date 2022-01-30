import http from "api/http";

export const fetchItems = async (credentials) => {
  return await http.get(credentials);
};

export const addItem = async (credentials) => {
  return await http.post(credentials);
};

export const removeItem = async (credentials) => {
  return await http.delete(credentials);
};
