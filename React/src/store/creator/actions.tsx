import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const changeState = createAsyncThunk(
  "creator/changeState",
  async (data: { type: string; id: string; input: string }) => {
    return { type: data.type, id: data.id, input: data.input };
  }
);

export const addToCitiesArray = createAction("creator/addToCitiesArray");

export const removeFromCitiesArray = createAsyncThunk(
  "creator/removeFromCitiesArray",
  async (index) => {
    return index;
  }
);

export const updateCitiesArray = createAsyncThunk(
  "creator/updateCitiesArray",
  async (data: { index: number; id: string }) => {
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
