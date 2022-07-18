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

export const fetchComments = async (id) => {
  const { data } = await http.get(
    endpoints.GET_USER_COMMENTS.replace("{id}", id)
  );
  return data;
};

export const addComment = async (data) => {
  return await http.post(
    endpoints.POST_USER_COMMENTS.replace("{id}", data.user),
    data.rating
      ? { comment: data.comment, rating: 6 - data.rating }
      : { comment: data.comment, parent: data.parent }
  );
};

export const removeComment = async (data) => {
  return await http.delete(
    endpoints.DELETE_USER_COMMENTS.replace("{comment_id}", data)
  );
};
