import { createAsyncThunk } from "@reduxjs/toolkit";
import * as itemsService from "api/services/items.service";

export const fetchItems = createAsyncThunk("items/fetchItems", async (data) => {
  return await itemsService.fetchItems(data);
});
