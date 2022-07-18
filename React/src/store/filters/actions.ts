import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeState = createAsyncThunk(
  "filters/changeState",
  async (data: any) => {
    return data;
  }
);

export const resetAllStates = createAsyncThunk(
  "filters/resetAllStates",
  async () => {}
);
