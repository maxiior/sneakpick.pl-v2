import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as itemsService from "api/services/items.service";

export const turnOnPending = createAction("items/turnOnPending");

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (data: any, { dispatch }) => {
    dispatch(turnOnPending());
    return await itemsService.fetchItems(data);
  }
);
