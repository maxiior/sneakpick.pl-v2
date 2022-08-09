import { createSlice } from "@reduxjs/toolkit";
import { changeState, resetAllStates } from "store/filters/actions";
import { getCategoriesIndexed } from "functions/getCategoriesIndexed";

const initialState = {
  filterTypes: {
    categories: "categories",
    brands: "brands",
    types: "types",
    conditions: "conditions",
    shoesSizes: "shoesSizes",
    clothesSizes: "clothesSizes",
    fits: "fits",
    colors: "colors",
  },
  filters: {
    categories: getCategoriesIndexed(),
    brands: [
      { id: 1, text: "Nike" },
      { id: 2, text: "Adidas" },
      { id: 3, text: "Supreme" },
      { id: 4, text: "Puma" },
      { id: 5, text: "New Balance" },
      { id: 6, text: "Vans" },
      { id: 7, text: "Louis Vuitton" },
      { id: 8, text: "Palace" },
      { id: 9, text: "Diadora" },
      { id: 10, text: "Reebok" },
      { id: 11, text: "Balenciaga" },
      { id: 12, text: "Lacoste" },
      { id: 13, text: "Yeezy" },
      { id: 14, text: "Off-White" },
      { id: 15, text: "Converse" },
      { id: 16, text: "Stone Island" },
      { id: 17, text: "The North Face" },
      { id: 18, text: "Ralph Lauren" },
      { id: 19, text: "Guess" },
      { id: 20, text: "Tommy Hilfiger" },
      { id: 21, text: "VLONE" },
      { id: 22, text: "Inne" },
    ],
    types: [
      { id: 1, text: "MĘSKI" },
      { id: 2, text: "DAMSKI" },
    ],
    conditions: [
      { id: 1, text: "DS" },
      { id: 2, text: "VNDS" },
      { id: 3, text: "4/5" },
      { id: 4, text: "3/5" },
      { id: 5, text: "2/5" },
      { id: 6, text: "1/5" },
    ],
    shoesSizes: [
      { id: 1, text: "36.0" },
      { id: 2, text: "36.5" },
      { id: 3, text: "37.0" },
      { id: 4, text: "37.5" },
      { id: 5, text: "38.0" },
      { id: 6, text: "38.5" },
      { id: 7, text: "39.0" },
      { id: 8, text: "39.5" },
      { id: 9, text: "40.0" },
      { id: 10, text: "40.5" },
      { id: 11, text: "41.0" },
      { id: 12, text: "41.5" },
      { id: 13, text: "42.0" },
      { id: 14, text: "42.5" },
      { id: 15, text: "43.0" },
      { id: 16, text: "43.5" },
      { id: 17, text: "44.0" },
      { id: 18, text: "44.5" },
      { id: 19, text: "45.0" },
      { id: 20, text: "45.5" },
      { id: 21, text: "46.0" },
      { id: 22, text: "46.5" },
      { id: 23, text: "47.0" },
      { id: 24, text: "47.5" },
      { id: 25, text: "48.0" },
      { id: 26, text: "48.5" },
      { id: 27, text: "49.0" },
      { id: 28, text: "49.5" },
      { id: 29, text: "50.0" },
    ],
    clothesSizes: [
      { id: 1, text: "XXS" },
      { id: 2, text: "XS" },
      { id: 3, text: "S" },
      { id: 4, text: "M" },
      { id: 5, text: "L" },
      { id: 6, text: "XL" },
      { id: 7, text: "XXL" },
    ],
    fits: [
      { id: 1, text: "SLIM FIT" },
      { id: 2, text: "REGULAR" },
      { id: 3, text: "OVERSIZE" },
    ],
    colors: [
      { id: 1, text: "brown" },
      { id: 2, text: "red" },
      { id: 3, text: "orange" },
      { id: 4, text: "yellow" },
      { id: 5, text: "green" },
      { id: 6, text: "blue" },
      { id: 7, text: "purple" },
      { id: 8, text: "pink" },
      { id: 9, text: "black" },
      { id: 10, text: "grey" },
      { id: 11, text: "white" },
      { id: 12, text: "multi" },
    ],
  },
  currentFilters: {
    brands: [],
    categories: "",
    types: [],
    conditions: [],
    clothesSizes: [],
    shoesSizes: [],
    fits: [],
    colors: [],
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeState.fulfilled, (state, action) => {
      if (action.payload.input === "checkbox") {
        if (
          state.currentFilters[action.payload.filterType].includes(
            action.payload.id
          )
        ) {
          state.currentFilters[action.payload.filterType] =
            state.currentFilters[action.payload.filterType].filter(
              (i) => i !== action.payload.id
            );
        } else {
          state.currentFilters[action.payload.filterType] = [
            ...state.currentFilters[action.payload.filterType],
            action.payload.id,
          ];
        }
      } else if (action.payload.input === "radio") {
        if (
          state.currentFilters[action.payload.filterType] === action.payload.id
        ) {
          state.currentFilters[action.payload.filterType] = "";
        } else {
          state.currentFilters[action.payload.filterType] = action.payload.id;
        }
      }
    });
    builder.addCase(resetAllStates.fulfilled, (state) => {
      state.currentFilters.brands = [];
      state.currentFilters.categories = "";
      state.currentFilters.types = [];
      state.currentFilters.conditions = [];
      state.currentFilters.clothesSizes = [];
      state.currentFilters.shoesSizes = [];
      state.currentFilters.fits = [];
      state.currentFilters.colors = [];
    });
  },
});

export default filtersSlice.reducer;
