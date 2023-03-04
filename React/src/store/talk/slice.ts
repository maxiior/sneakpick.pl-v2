import { createSlice } from "@reduxjs/toolkit";
import {
  fetchQuestions,
  turnOnPending,
  resetAllLoaded,
  removeQuestion,
} from "./actions";

const initialState: any = {
  questions: [],
  count: 0,
  init_pending: true,
  reloading_pending: false,
  limit: 24,
  offset: 0,
  all_loaded: false,
};

export const talkSlice = createSlice({
  name: "talk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      if (action.payload) {
        state.questions = [...state.questions, ...action.payload.results];
        state.count = action.payload.count;
        state.init_pending = false;
        state.reloading_pending = false;

        if (action.payload.results.length + state.offset >= state.count)
          state.all_loaded = true;
      }
    });
    builder.addCase(turnOnPending, (state) => {
      state.reloading_pending = true;
      state.offset += state.limit;
    });
    builder.addCase(resetAllLoaded, (state) => {
      state.questions = [];
      state.init_pending = true;
      state.reloading_pending = false;
      state.limit = 2;
      state.offset = 0;
      state.all_loaded = false;
    });
    builder.addCase(removeQuestion, (state, action) => {
      state.questions = state.questions.filter(
        (e: any) => e.id !== action.payload
      );
    });
  },
});

export default talkSlice.reducer;
