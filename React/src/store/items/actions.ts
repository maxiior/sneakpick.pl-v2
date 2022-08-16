import { createAsyncThunk } from "@reduxjs/toolkit";
import * as itemsService from "api/services/items.service";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (data: any) => {
    return await itemsService.fetchItems(data);
  }
);
