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
    categories: [
      { id: 1, text: "Sneakersy", checked: false },
      { id: 2, text: "Hoodie", checked: false },
      { id: 3, text: "Teesy", checked: false },
      { id: 4, text: "Koszule", checked: false },
      { id: 5, text: "Crewnecki", checked: false },
      { id: 6, text: "Longsleevy", checked: false },
      { id: 7, text: "Katany", checked: false },
      { id: 8, text: "Kurtki", checked: false },
      { id: 9, text: "Płaszcze", checked: false },
      { id: 10, text: "Spodnie", checked: false },
      { id: 11, text: "Szale", checked: false },
      { id: 12, text: "Portfele", checked: false },
      { id: 13, text: "Plecaki", checked: false },
      { id: 14, text: "Zegarki", checked: false },
      { id: 15, text: "Czapki", checked: false },
      { id: 16, text: "Belty", checked: false },
      { id: 17, text: "Bielizna", checked: false },
      { id: 18, text: "Inne", checked: false },
    ],
    brands: [
      { id: 1, text: "Nike", checked: false },
      { id: 2, text: "Adidas", checked: false },
      { id: 3, text: "Supreme", checked: false },
      { id: 4, text: "Puma", checked: false },
      { id: 5, text: "New Balance", checked: false },
      { id: 6, text: "Vans", checked: false },
      { id: 7, text: "Louis Vuitton", checked: false },
      { id: 8, text: "Palace", checked: false },
      { id: 9, text: "Diadora", checked: false },
      { id: 10, text: "Reebok", checked: false },
      { id: 11, text: "Balenciaga", checked: false },
      { id: 12, text: "Lacoste", checked: false },
      { id: 13, text: "Yeezy", checked: false },
      { id: 14, text: "Off-White", checked: false },
      { id: 15, text: "Converse", checked: false },
      { id: 16, text: "Stone Island", checked: false },
      { id: 17, text: "The North Face", checked: false },
      { id: 18, text: "Ralph Lauren", checked: false },
      { id: 19, text: "Guess", checked: false },
      { id: 20, text: "Tommy Hilfiger", checked: false },
      { id: 21, text: "VLONE", checked: false },
      { id: 22, text: "Inne", checked: false },
    ],
    types: [
      { id: 1, text: "MĘSKI", checked: false },
      { id: 2, text: "DAMSKI", checked: false },
    ],
    conditions: [
      { id: 1, text: "DS", checked: false },
      { id: 2, text: "VNDS", checked: false },
      { id: 3, text: "4/5", checked: false },
      { id: 4, text: "3/5", checked: false },
      { id: 5, text: "2/5", checked: false },
      { id: 6, text: "1/5", checked: false },
    ],
    shoesSizes: [
      { id: 1, text: "36.0", checked: false },
      { id: 2, text: "36.5", checked: false },
      { id: 3, text: "37.0", checked: false },
      { id: 4, text: "37.5", checked: false },
      { id: 5, text: "38.0", checked: false },
      { id: 6, text: "38.5", checked: false },
      { id: 7, text: "39.0", checked: false },
      { id: 8, text: "39.5", checked: false },
      { id: 9, text: "40.0", checked: false },
      { id: 10, text: "40.5", checked: false },
      { id: 11, text: "41.0", checked: false },
      { id: 12, text: "41.5", checked: false },
      { id: 13, text: "42.0", checked: false },
      { id: 14, text: "42.5", checked: false },
      { id: 15, text: "43.0", checked: false },
      { id: 16, text: "43.5", checked: false },
      { id: 17, text: "44.0", checked: false },
      { id: 18, text: "44.5", checked: false },
      { id: 19, text: "45.0", checked: false },
      { id: 20, text: "45.5", checked: false },
      { id: 21, text: "46.0", checked: false },
      { id: 22, text: "46.5", checked: false },
      { id: 23, text: "47.0", checked: false },
      { id: 24, text: "47.5", checked: false },
      { id: 25, text: "48.0", checked: false },
      { id: 26, text: "48.5", checked: false },
      { id: 27, text: "49.0", checked: false },
      { id: 28, text: "49.5", checked: false },
      { id: 29, text: "50.0", checked: false },
    ],
    clothesSizes: [
      { id: 1, text: "XXS", checked: false },
      { id: 2, text: "XS", checked: false },
      { id: 3, text: "S", checked: false },
      { id: 4, text: "M", checked: false },
      { id: 5, text: "L", checked: false },
      { id: 6, text: "XL", checked: false },
      { id: 7, text: "XXL", checked: false },
    ],
    fits: [
      { id: 1, text: "SLIM FIT", checked: false },
      { id: 2, text: "REGULAR", checked: false },
      { id: 3, text: "OVERSIZE", checked: false },
    ],
    colors: [
      { id: 1, text: "#A23A3A", checked: false },
      { id: 2, text: "#F2324D", checked: false },
      { id: 3, text: "#F4A523", checked: false },
      { id: 4, text: "#F8E71B", checked: false },
      { id: 5, text: "#7CD321", checked: false },
      { id: 6, text: "#4CA3FD", checked: false },
      { id: 7, text: "#8F12FF", checked: false },
      { id: 8, text: "#EC94FF", checked: false },
      { id: 9, text: "#000000", checked: false },
      { id: 10, text: "#AAAAAA", checked: false },
      { id: 11, text: "#FFFFFF", checked: false },
      { id: 12, text: "multi", checked: false },
    ],
  },
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_STATE":
      if (action.payload.input === "checkbox") {
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
