import { createSlice } from "@reduxjs/toolkit";
import { fetchSteals, turnOnPending } from "./actions";

const initialState: any = {
  steals: { today: [], later: [] },
  today_count: 0,
  later_count: 0,
  init_pending: true,
  reloading_pending: false,
  limit: 24,
  offset: 0,
  all_loaded: false,
};

export const stealSlice = createSlice({
  name: "steal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSteals.fulfilled, (state, action) => {
      if (action.payload) {
        state.steals = {
          today: [...state.steals.today, ...action.payload.results.today],
          later: [...state.steals.later, ...action.payload.results.later],
        };
        state.today_count += action.payload.today_count;
        state.later_count += action.payload.later_count;
        state.init_pending = false;
        state.reloading_pending = false;

        if (
          action.payload.today_count + action.payload.later_count <
          state.limit
        )
          state.all_loaded = true;
      }
    });
    builder.addCase(turnOnPending, (state) => {
      state.reloading_pending = true;
      state.offset += state.limit;
    });
  },
});

export default stealSlice.reducer;
