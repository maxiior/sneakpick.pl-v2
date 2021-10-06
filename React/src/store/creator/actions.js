import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeState = createAsyncThunk(
  "creator/changeState",
  async (data) => {
    console.log(data);
    return { type: data.type, id: data.id, input: data.input };
  }
);

export const addToCitiesArray = createAsyncThunk(
  "creator/addToCitiesArray",
  async () => {}
);

export const removeFromCitiesArray = createAsyncThunk(
  "creator/removeFromCitiesArray",
  async (index) => {
    return index;
  }
);

export const updateCitiesArray = createAsyncThunk(
  "creator/updateCitiesArray",
  async (data) => {
    return { index: data.index, id: data.id };
  }
);

export const setCitiesArray = createAsyncThunk(
  "creator/setCitiesArray",
  async (id) => {
    return id;
  }
);

export const resetCurrentStates = createAsyncThunk(
  "creator/resetCurrentStates",
  async () => {}
);
