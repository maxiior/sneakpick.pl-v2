import { createAsyncThunk } from "@reduxjs/toolkit";
import * as profile from "api/services/profile.service.js";

export const fetchItems = createAsyncThunk(
  "profile/fetchItems",
  async (data) => {
    const result = await profile.fetchItems(data);
    return { items: result.results, results: result.count };
  }
);

export const fetchUser = createAsyncThunk("profile/fetchUser", async (data) => {
  const result = await profile.fetchUser(data);
  return {
    first_name: result.first_name,
    last_name: result.last_name,
    city: result.city,
  };
});
