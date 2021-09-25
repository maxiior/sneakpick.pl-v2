import { createAsyncThunk } from "@reduxjs/toolkit";
import * as profile from "api/services/profile.service.js";

export const fetchItems = createAsyncThunk("profile/fetchItems", async (id) => {
  const result = await profile.fetchItems(id);
  return { items: result.results, results: result.count };
});

export const fetchUser = createAsyncThunk("profile/fetchUser", async (id) => {
  const result = await profile.fetchUser(id);
  return {
    id: result.id,
    first_name: result.first_name,
    last_name: result.last_name,
    city: result.city,
  };
});
