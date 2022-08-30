import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeSelector = createAsyncThunk(
  "selectors/changeSelector",
  async (data: any) => {
    if (Array.isArray(data)) return data;
    else return [data];
  }
);
