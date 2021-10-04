import http from "api/http";

export const fetchItems = async (credentials) => {
  return await http.get(credentials);
};
