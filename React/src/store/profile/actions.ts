import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as profile from "api/services/profile.service.js";

export const fetchItems = createAsyncThunk<any, string>(
  "profile/fetchItems",
  async (data) => {
    const result = await profile.fetchItems(data);
    return { items: result.results, items_results: result.count };
  }
);

export const fetchUser = createAsyncThunk(
  "profile/fetchUser",
  async (data: string) => {
    const result = await profile.fetchUser(data);
    return {
      first_name: result.first_name,
      last_name: result.last_name,
      city: result.city,
    };
  }
);

export const fetchComments = createAsyncThunk<any, string>(
  "profile/fetchComments",
  async (data) => {
    const result = await profile.fetchComments(data);
    return { comments: result.results.reverse(), comments_count: result.count };
  }
);

export const addComment = createAsyncThunk(
  "profile/addComment",
  async (data: {
    user: string;
    comment: string;
    rating?: number;
    parent?: string;
  }) => {
    const result = await profile.addComment(data);
    return result.data;
  }
);

export const removeComment = createAsyncThunk(
  "profile/removeComment",
  async (data: string) => {
    await profile.removeComment(data);
    return data;
  }
);

export const removeAnswear = createAsyncThunk(
  "profile/removeAnswear",
  async (data: { id: string; parent: string }) => {
    await profile.removeComment(data.id);
    return data.parent;
  }
);

export const openFollowedPopup = createAction("profile/openFollowedPopup");

export const openFollowersPopup = createAction("profile/openFollowersPopup");
