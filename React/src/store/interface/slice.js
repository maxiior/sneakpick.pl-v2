import { createSlice } from "@reduxjs/toolkit";
import {
  openLoginView,
  closeLoginView,
  openRegisterView,
  closeRegisterView,
  openMenuView,
  closeMenuView,
  displayCommunicatorIcon,
  hideCommunicatorIcon,
  openMobileFilters,
  closeMobileFilters,
  setInformationBlock,
  resetInformationBlock,
  hideCommunicator,
  openCommunicator,
} from "store/interface/actions";

const initialState = {
  loginView: false,
  registerView: false,
  menuView: false,
  communicatorIcon: true,
  communicatorBar: false,
  mobileFilters: false,
  informationBlock: null,
};

export const interfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(openLoginView.fulfilled, (state) => {
      state.loginView = true;
      state.communicatorIcon = false;
    });
    builder.addCase(closeLoginView.fulfilled, (state) => {
      state.loginView = false;
      state.communicatorIcon = true;
    });
    builder.addCase(openRegisterView.fulfilled, (state) => {
      state.registerView = true;
      state.communicatorIcon = false;
    });
    builder.addCase(closeRegisterView.fulfilled, (state) => {
      state.registerView = false;
      state.communicatorIcon = true;
    });
    builder.addCase(openMenuView.fulfilled, (state) => {
      state.menuView = true;
      state.communicatorIcon = false;
    });
    builder.addCase(closeMenuView.fulfilled, (state) => {
      state.menuView = false;
      state.communicatorIcon = true;
    });
    builder.addCase(displayCommunicatorIcon.fulfilled, (state) => {
      state.communicatorIcon = true;
    });
    builder.addCase(hideCommunicatorIcon.fulfilled, (state) => {
      state.communicatorIcon = false;
    });
    builder.addCase(openMobileFilters.fulfilled, (state) => {
      state.mobileFilters = true;
    });
    builder.addCase(closeMobileFilters.fulfilled, (state) => {
      state.mobileFilters = false;
    });
    builder.addCase(setInformationBlock.fulfilled, (state, action) => {
      state.informationBlock = action.payload;
    });
    builder.addCase(resetInformationBlock.fulfilled, (state) => {
      state.informationBlock = null;
    });
    builder.addCase(hideCommunicator.fulfilled, (state) => {
      state.communicatorBar = false;
    });
    builder.addCase(openCommunicator.fulfilled, (state) => {
      state.communicatorBar = true;
    });
  },
});

export default interfaceSlice.reducer;
