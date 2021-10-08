import { createAsyncThunk } from "@reduxjs/toolkit";
import * as itemsService from "api/services/items.service";
import { endpoints } from "routes";

export const fetchFollowedItems = createAsyncThunk(
  "followed/fetchFollowedItems",
  async () => {
    const { data } = await itemsService.fetchItems(endpoints.FOLLOWED);
    return Object.keys(data).map((e) => ({
      name: e,
      size: data[e].size,
      condition: data[e].condition,
      id: data[e].id,
      price: data[e].price,
    }));
  }
);

export const removeFollowedItem = createAsyncThunk(
  "followed/removeFollowedItem",
  async (data) => {
    return data;
  }
);

export const addFollowedItem = createAsyncThunk(
  "followed/addFollowedItem",
  async (data) => {
    return data;
  }
);
