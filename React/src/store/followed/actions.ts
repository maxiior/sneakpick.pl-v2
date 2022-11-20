import { createAsyncThunk } from "@reduxjs/toolkit";
import * as itemsService from "api/services/items.service";

export const fetchFollowedItems = createAsyncThunk(
  "followed/fetchFollowedItems",
  async () => {
    const { data } = await itemsService.fetchFollowedItems();

    return data.results;
  }
);

export const removeFollowedItem = createAsyncThunk(
  "followed/removeFollowedItem",
  async (id: string) => {
    await itemsService.removeItem(id);
    return id;
  }
);

export const addFollowedItem = createAsyncThunk(
  "followed/addFollowedItem",
  async (data: string) => {
    return data;
  }
);
