import { createSlice } from "@reduxjs/toolkit";
import {
  fetchItems,
  fetchUser,
  fetchFollowers,
  fetchFollowing,
  changeFollowersNumber,
  changeFollowedNumber,
  fetchComments,
  addComment,
  removeComment,
} from "store/profile/actions";

const initialState = {
  items: [],
  comments: [],
  items_results: 0,
  comments_count: 0,
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
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.comments_count = action.payload.comments_count;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      if (action.payload.comment.parent !== null) {
        state.comments.map((e) =>
          e.id === action.payload.comment.parent
            ? (e.responses = [action.payload.comment])
            : e
        );
      } else {
        state.comments = [action.payload.comment, ...state.comments];
        state.comments_count += 1;
        state.user.rating = action.payload.avg_rating;
      }
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter((e) => e.id !== action.payload.id);
      state.comments_count -= 1;
      state.user.rating = action.payload.avg_rating;
    });
  },
});

export default profileSlice.reducer;
