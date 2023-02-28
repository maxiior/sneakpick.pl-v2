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
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
      description: result.description,
      photo: result.profile_photo,
      followers_count: result.followers_count,
      following_count: result.following_count,
      rating: result.average_rating,
      is_followed: result.is_followed,
      city: result.city,
    };
  }
);

export const turnOnPending = createAction("profile/turnOnPending");

export const resetComments = createAction("profile/resetAllLoaded");

export const resetItems = createAction("items/resetItems");

export const fetchComments = createAsyncThunk<
  any,
  { user: string; reloading: boolean }
>("profile/fetchComments", async (data, { dispatch, getState }) => {
  const { profileSlice }: any = getState();

  if (!profileSlice.reloading_pending) {
    if (data.reloading) dispatch(turnOnPending());

    const result = await profile.fetchComments(
      data.user,
      data.reloading
        ? profileSlice.offset + profileSlice.limit
        : profileSlice.offset
    );
    return { comments: result.results, comments_count: result.count };
  } else return null;
});

export const addComment = createAsyncThunk(
  "profile/addComment",
  async (data: {
    user: string;
    content: string;
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
    const result = await profile.removeComment(data);
    return { id: data, avg_rating: result.data.avg_rating };
  }
);

export const removeAnswear = createAsyncThunk(
  "profile/removeAnswear",
  async (data: { id: string; parent: string }) => {
    await profile.removeComment(data.id);
    return data.parent;
  }
);

export const changeFollowersNumber = createAction(
  "profile/changeFollowersNumber",
  (data: { value: number; is_followed: boolean }) => {
    return { payload: data };
  }
);

export const changeFollowingNumber = createAction(
  "profile/changeFollowingNumber",
  (data: number) => {
    return { payload: data };
  }
);

export const fetchFollowers = createAsyncThunk<any, string>(
  "profile/fetchFollowers",
  async (data) => {
    const result = await profile.fetchFollowers(data);
    return result.data.results;
  }
);

export const fetchFollowing = createAsyncThunk<any, string>(
  "profile/fetchFollowing",
  async (data) => {
    const result = await profile.fetchFollowing(data);
    return result.data.results;
  }
);
