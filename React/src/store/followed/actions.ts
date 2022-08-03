import { createAsyncThunk } from "@reduxjs/toolkit";
import * as itemsService from "api/services/items.service";

export const fetchFollowedItems = createAsyncThunk(
  "followed/fetchFollowedItems",
  async () => {
    const { data } = await itemsService.fetchFollowedItems();

    return data.results.map((e: any) => ({
      name: e.name,
      size: e.size,
      condition: e.condition,
      id: e.id,
      price: e.price,
      photo: e.images,
    }));
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
