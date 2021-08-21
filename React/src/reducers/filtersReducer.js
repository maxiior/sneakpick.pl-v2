import {categories} from "./categories";
import {generateSizes} from "./shoesSizesGenerator";
import {clothSizes} from "./clothSizes";
import {colors} from "./colors";
import {conditions} from "./conditions";

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
    categories: categories.map((category, index) => {
      return {id: index, text: category, checked: false};
        }
    ),
    brands: brands.map((brand, index) => {
      return {id: index, text: brand, checked: false};
    }),
    types: [
      { id: 1, text: "MĘSKI", checked: false },
      { id: 2, text: "DAMSKI", checked: false },
    ],
    conditions: conditions.map((condition, index) => {
      return {id: index, text: condition, checked: false};
    }),
    shoesSizes: generateSizes(36,50, 0.5).map((size, index) => {
      let textSize = '';
      if(!(size % 2)){
        textSize = size.toString() + '.0';
      }
      else {
        textSize = size.toString()
      }
      return {id: index, text: textSize, checked: false};
    }),
    clothesSizes: clothSizes.map((size, index) => {
      return {id: index, text: size, checked: false};
    }),
    fits: [
      { id: 1, text: "SLIM FIT", checked: false },
      { id: 2, text: "REGULAR", checked: false },
      { id: 3, text: "OVERSIZE", checked: false },
    ],
    colors: colors.map((color, index) => {
      return {id: index, text: color, checked: false};
    })
  },
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_STATE":
      if (action.payload.input === "checkbox") {
        console.log("elo");
        return {
          ...state,
          filters: {
            ...state.filters,
            [action.payload.filterType]: [
              ...state.filters[action.payload.filterType].map((option) =>
                option.id === action.payload.id
                  ? { ...option, checked: !option.checked }
                  : option
              ),
            ],
          },
        };
      } else {
        return {
          ...state,
          filters: {
            ...state.filters,
            [action.payload.filterType]: [
              ...state.filters[action.payload.filterType].map((option) =>
                option.id === action.payload.id
                  ? { ...option, checked: !option.checked }
                  : { ...option, checked: false }
              ),
            ],
          },
        };
      }
    case "RESET_ALL_STATES":
      return {
        ...state,
        filters: Object.entries(state.filters).reduce((filter, [key, arr]) => {
          filter[key] = arr.map((option) => ({ ...option, checked: false }));
          return filter;
        }, {}),
      };
    default:
      return state;
  }
};

export default filtersReducer;
