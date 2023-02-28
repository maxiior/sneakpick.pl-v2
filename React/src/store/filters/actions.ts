import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeState = createAsyncThunk(
  "filters/changeState",
  async (data: any) => {
    if (Array.isArray(data)) return data;
    else return [data];
  }
);

export const resetAllStates = createAsyncThunk(
  "filters/resetAllStates",
  async () => {}
);
