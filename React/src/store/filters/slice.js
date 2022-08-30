import { createSlice } from "@reduxjs/toolkit";
import { changeState, resetAllStates } from "store/filters/actions";
import { getCategoriesIndexed } from "functions/getCategoriesIndexed";

const initialState = {
  filterTypes: {
    category: { name: "category", input: "radio" },
    brand: { name: "brand", input: "checkbox" },
    kind: { name: "kind", input: "checkbox" },
    condition: { name: "condition", input: "checkbox" },
    shoesSize: { name: "shoesSize", input: "checkbox" },
    clotheSize: { name: "clotheSize", input: "checkbox" },
    fit: { name: "fit", input: "checkbox" },
    colorway: { name: "colorway", input: "checkbox" },
    price: { name: "price", input: "range" },
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
      { id: 1, text: "męski" },
      { id: 2, text: "damski" },
    ],
    conditions: [
      { id: 1, text: "ds" },
      { id: 2, text: "vnds" },
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
      { id: 1, text: "xxs" },
      { id: 2, text: "xs" },
      { id: 3, text: "s" },
      { id: 4, text: "m" },
      { id: 5, text: "l" },
      { id: 6, text: "xl" },
      { id: 7, text: "xxl" },
    ],
    fits: [
      { id: 1, text: "slim fit" },
      { id: 2, text: "regular" },
      { id: 3, text: "oversize" },
    ],
    colorways: [
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
    brand: [],
    category: "",
    kind: [],
    condition: [],
    clotheSize: [],
    shoesSize: [],
    fit: [],
    colorway: [],
    price: -1,
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeState.fulfilled, (state, action) => {
      action.payload.forEach((el) => {
        if (el.input === "checkbox") {
          el.id.split(",").forEach((e) => {
            if (state.currentFilters[el.filterType].includes(e)) {
              state.currentFilters[el.filterType] = state.currentFilters[
                el.filterType
              ].filter((i) => i !== e);
            } else {
              state.currentFilters[el.filterType] = [
                ...state.currentFilters[el.filterType],
                e,
              ];
            }
          });
        } else if (el.input === "radio") {
          if (state.currentFilters[el.filterType] === el.id) {
            state.currentFilters[el.filterType] = "";
          } else {
            state.currentFilters[el.filterType] = el.id;
          }
        } else if (el.input === "range") {
          state.currentFilters[el.filterType] = el.id;
        }
      });
    });
    builder.addCase(resetAllStates.fulfilled, (state) => {
      state.currentFilters.brand = [];
      state.currentFilters.category = "";
      state.currentFilters.kind = [];
      state.currentFilters.condition = [];
      state.currentFilters.clotheSize = [];
      state.currentFilters.shoesSize = [];
      state.currentFilters.fit = [];
      state.currentFilters.colorway = [];
      state.currentFilters.price = -1;
    });
  },
});

export default filtersSlice.reducer;
