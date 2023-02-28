import { createSlice } from "@reduxjs/toolkit";
import {
  changeState,
  addToCitiesArray,
  removeFromCitiesArray,
  updateCitiesArray,
  setCitiesArray,
  resetCurrentStates,
} from "store/creator/actions";
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

const initialState: any = {
  filterTypes: {
    categories: "categories",
    brands: "brands",
    types: "types",
    conditions: "conditions",
    shoesSizes: "shoesSizes",
    clothesSizes: "clothesSizes",
    fits: "fits",
    colorways: "colorways",
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
      { id: 22, text: "Inne" },
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
    name: "",
    brands: "placeholder",
    categories: "placeholder",
    description: "",
    types: "",
    conditions: "",
    shoesSizes: "",
    clothesSizes: "",
    fits: "",
    colorways: "",
    price: null,
    SHIP: false,
    MEET: false,
    for_trade: false,
    cities: [],
  },
};

export const creatorSlice = createSlice({
  name: "creator",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeState.fulfilled, (state, action) => {
      if (action.payload.input === "checkbox") {
        state.currentFilters[action.payload.type] =
          !state.currentFilters[action.payload.type];
      } else if (
        action.payload.input === "radio" ||
        action.payload.input === "text"
      ) {
        state.currentFilters[action.payload.type] = action.payload.id;
      } else if (action.payload.input === "number") {
        state.currentFilters[action.payload.type] = parseFloat(
          action.payload.id
        );
      }
    });
    builder.addCase(addToCitiesArray, (state) => {
      if (state.currentFilters.cities.length < 5) {
        state.currentFilters.cities = [...state.currentFilters.cities, ""];
      }
    });
    builder.addCase(removeFromCitiesArray.fulfilled, (state, action) => {
      state.currentFilters.cities = state.currentFilters.cities.filter(
        (_: any, i: any) => i !== action.payload
      );
    });
    builder.addCase(updateCitiesArray.fulfilled, (state, action) => {
      state.currentFilters.cities = state.currentFilters.cities.map(
        (c: any, i: any) => (i === action.payload.index ? action.payload.id : c)
      );
    });
    builder.addCase(setCitiesArray.fulfilled, (state, action) => {
      if (
        state.currentFilters.MEET &&
        state.currentFilters.cities.length === 0
      ) {
        state.currentFilters.cities = [action.payload];
      } else if (state.currentFilters.cities.length === 0) {
        state.currentFilters.cities = [];
      }
    });
    builder.addCase(resetCurrentStates.fulfilled, (state) => {
      state.currentFilters.name = "";
      state.currentFilters.brands = "placeholder";
      state.currentFilters.categories = "placeholder";
      state.currentFilters.description = "";
      state.currentFilters.types = "";
      state.currentFilters.conditions = "";
      state.currentFilters.shoesSizes = "";
      state.currentFilters.clothesSizes = "";
      state.currentFilters.fits = "";
      state.currentFilters.colorways = "";
      state.currentFilters.price = null;
      state.currentFilters.SHIP = false;
      state.currentFilters.MEET = false;
      state.currentFilters.cities = [];
    });
  },
});

export default creatorSlice.reducer;
