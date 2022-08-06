import { createSlice } from "@reduxjs/toolkit";
import {
  fetchItems,
  fetchUser,
  fetchFollowers,
  fetchFollowing,
  changeFollowersNumber,
  changeFollowedNumber,
} from "store/profile/actions";

const initialState = {
  items: [],
  comments: [],
  items_results: 0,
  comments_results: 0,
  user: {
    id: "",
    first_name: "",
    last_name: "",
    city: "",
    description: "",
    photo: "",
    rating: 0,
    following_count: 0,
    followers_count: 0,
    following_details: [],
    followers_details: [],
    is_followed: false,
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.items_results = action.payload.items_results;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user.id = action.payload.id;
      state.user.first_name = action.payload.first_name;
      state.user.last_name = action.payload.last_name;
      state.user.description = action.payload.description;
      state.user.photo = action.payload.photo;
      state.user.following_count = action.payload.following_count;
      state.user.followers_count = action.payload.followers_count;
      state.user.rating = action.payload.rating;
      state.user.is_followed = action.payload.is_followed;
      state.user.city = action.payload.city;
    });
    builder.addCase(fetchFollowers.fulfilled, (state, action) => {
      state.user.followers_details = [...action.payload];
    });
    builder.addCase(fetchFollowing.fulfilled, (state, action) => {
      state.user.following_details = [...action.payload];
    });
    builder.addCase(changeFollowersNumber, (state, action) => {
      state.user.followers_count += action.payload.value;
      state.user.is_followed = action.payload.is_followed;
    });
    builder.addCase(changeFollowedNumber, (state, action) => {
      state.user.following_count += action.payload;
    });
  },
});

export default profileSlice.reducer;
