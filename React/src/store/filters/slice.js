import { createSlice } from "@reduxjs/toolkit";
import { changeState, resetAllStates } from "store/filters/actions";
import { getIndexedFilters } from "functions/getIndexedFilters";
import {
  CONDITIONS,
  SHOES_SIZES,
  CLOTHES_SIZES,
  FITS,
  COLORWAYS,
  KINDS,
  CATEGORIES,
} from "constants/filters";

const initialState = {
  filterTypes: {
    brand: { name: "brand", input: "checkbox" },
    category: { name: "category", input: "radio" },
    kind: { name: "kind", input: "checkbox" },
    condition: { name: "condition", input: "checkbox" },
    shoesSize: { name: "shoesSize", input: "checkbox" },
    clotheSize: { name: "clotheSize", input: "checkbox" },
    fit: { name: "fit", input: "checkbox" },
    colorway: { name: "colorway", input: "checkbox" },
    price: { name: "price", input: "range" },
  },
  filters: {
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
      { id: 22, text: "inne" },
    ],
    categories: getIndexedFilters(CATEGORIES),
    types: getIndexedFilters(KINDS),
    conditions: getIndexedFilters(CONDITIONS),
    shoesSizes: getIndexedFilters(SHOES_SIZES),
    clothesSizes: getIndexedFilters(CLOTHES_SIZES),
    fits: getIndexedFilters(FITS),
    colorways: getIndexedFilters(COLORWAYS),
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
