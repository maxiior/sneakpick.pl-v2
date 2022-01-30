import { createAsyncThunk } from "@reduxjs/toolkit";
import * as itemsService from "api/services/items.service";
import { endpoints } from "routes";

export const fetchFollowedItems = createAsyncThunk(
  "followed/fetchFollowedItems",
  async () => {
    const { data } = await itemsService.fetchItems(endpoints.GET_FOLLOWED);
    return Object.keys(data).map((e) => ({
      name: e,
      size: data[e].size,
      condition: data[e].condition,
      id: data[e].id,
      price: data[e].price,
      image: data[e].image,
    }));
  }
);

export const removeFollowedItem = createAsyncThunk(
  "followed/removeFollowedItem",
  async (id: string) => {
    const { data } = await itemsService.removeItem(
      endpoints.POST_FOLLOWED.replace("{id}", id)
    );
    return data;
  }
);

export const addFollowedItem = createAsyncThunk(
  "followed/addFollowedItem",
  async (data: string) => {
    return data;
  }
);
