import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const openLoginView = createAsyncThunk(
  "interface/openLoginView",
  async () => {}
);

export const closeLoginView = createAsyncThunk(
  "interface/closeLoginView",
  async () => {}
);

export const openRegisterView = createAsyncThunk(
  "interface/openRegisterView",
  async () => {}
);

export const closeRegisterView = createAsyncThunk(
  "interface/closeRegisterView",
  async () => {}
);

export const openMenuView = createAsyncThunk(
  "interface/openMenuView",
  async () => {}
);

export const closeMenuView = createAsyncThunk(
  "interface/closeMenuView",
  async () => {}
);

export const displayCommunicatorIcon = createAsyncThunk(
  "interface/displayCommunicatorIcon",
  async () => {}
);

export const hideCommunicatorIcon = createAsyncThunk(
  "interface/hideCommunicatorIcon",
  async () => {}
);

export const setInformationBlock = createAsyncThunk(
  "interface/setInformationBlock",
  async (data: string) => {
    return data;
  }
);

export const resetInformationBlock = createAsyncThunk(
  "interface/resetInformationBlock",
  async () => {}
);

export const openMobileFilters = createAsyncThunk(
  "filters/openMobileFilters",
  async () => {}
);

export const closeMobileFilters = createAsyncThunk(
  "filters/closeMobileFilters",
  async () => {}
);

export const openCommunicator = createAsyncThunk(
  "filters/openCommunicator",
  async () => {}
);

export const hideCommunicator = createAsyncThunk(
  "filters/hideCommunicator",
  async () => {}
);

export const openFollowingPopup = createAction("profile/openFollowingPopup");

export const openFollowersPopup = createAction("profile/openFollowersPopup");

export const closeProfilePopup = createAction("interface/closeProfilePopup");

export const openConditionalPopup = createAction(
  "interface/openConditionalPopup",
  (data: string) => {
    return { payload: data };
  }
);

export const closeConditionalPopup = createAction(
  "interface/closeConditionalPopup"
);
