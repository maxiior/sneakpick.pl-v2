import http from "api/http";
import { endpoints } from "routes";

export const fetchItems = async (id) => {
  const { data } = await http.get(
    endpoints.USER_PRODUCTS_LIST.replace("{id}", id)
  );
  return data;
};

export const fetchUser = async (id) => {
  const { data } = await http.get(endpoints.GET_USER.replace("{id}", id));
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
      ? { content: data.content, rating: 6 - data.rating }
      : { content: data.content, parent: data.parent }
  );
};

export const removeComment = async (data) => {
  return await http.delete(
    endpoints.DELETE_USER_COMMENTS.replace("{comment_id}", data)
  );
};

export const fetchFollowers = async (data) => {
  return await http.get(endpoints.GET_FOLLOWERS.replace("{id}", data));
};

export const fetchFollowing = async (data) => {
  return await http.get(endpoints.GET_FOLLOWING.replace("{id}", data));
};

export const followUser = async (data) => {
  return await http.post(endpoints.POST_FOLLOW, { id: data });
};

export const unfollowUser = async (data) => {
  return await http.delete(endpoints.DELETE_UNFOLLOW.replace("{id}", data));
};
