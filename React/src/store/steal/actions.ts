import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as stealsService from "api/services/steals.service";

export const turnOnPending = createAction("steal/turnOnPending");

export const fetchSteals = createAsyncThunk(
  "steals/fetchSteals",
  async (reloading: boolean, { dispatch, getState }) => {
    const { stealSlice }: any = getState();

    if (!stealSlice.reloading_pending) {
      if (reloading) dispatch(turnOnPending());

      return await stealsService.fetchSteals(
        reloading ? stealSlice.offset + stealSlice.limit : stealSlice.offset
      );
    } else return null;
  }
);
