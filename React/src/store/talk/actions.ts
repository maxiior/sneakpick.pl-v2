import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as talkService from "api/services/talk.service";

export const turnOnPending = createAction("talk/turnOnPending");

export const resetAllLoaded = createAction("talk/resetAllLoaded");

export const fetchQuestions = createAsyncThunk(
  "talk/fetchQuestions",
  async (
    { reloading, filters }: { reloading: boolean; filters: string },
    { dispatch, getState }
  ) => {
    const { talkSlice }: any = getState();

    if (!talkSlice.reloading_pending) {
      if (reloading) dispatch(turnOnPending());

      const result = await talkService.fetchQuestions(
        filters ? filters : "?ordering=0",
        reloading ? talkSlice.offset + talkSlice.limit : talkSlice.offset
      );
      return result.data;
    } else return null;
  }
);
