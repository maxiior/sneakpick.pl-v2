import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeSelector = createAsyncThunk(
  "selectors/changeSelector",
  async ({ type, value }) => {
    return { type, value };
  }
);
