import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeState = createAsyncThunk(
  "filters/changeState",
  async (data) => {
    return data;
  }
);

export const resetAllStates = createAsyncThunk(
  "filters/resetAllStates",
  async () => {}
);
