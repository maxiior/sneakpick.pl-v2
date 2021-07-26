const initialState = {
  categories: [
    { text: "Sneakersy", checked: false },
    { text: "Hoodie", checked: false },
    { text: "Teesy", checked: false },
    { text: "Koszule", checked: false },
    { text: "Crewnecki", checked: false },
    { text: "Longsleevy", checked: false },
    { text: "Katany", checked: false },
    { text: "Kurtki", checked: false },
    { text: "Płaszcze", checked: false },
    { text: "Spodnie", checked: false },
    { text: "Szale", checked: false },
    { text: "Portfele", checked: false },
    { text: "Plecaki", checked: false },
    { text: "Zegarki", checked: false },
    { text: "Czapki", checked: false },
    { text: "Belty", checked: false },
    { text: "Bielizna", checked: false },
    { text: "Inne", checked: false },
  ],
  brands: [
    { text: "Nike", checked: false },
    { text: "Adidas", checked: false },
    { text: "Supreme", checked: false },
    { text: "Puma", checked: false },
    { text: "New Balance", checked: false },
    { text: "Vans", checked: false },
    { text: "Louis Vuitton", checked: false },
    { text: "Palace", checked: false },
    { text: "Diadora", checked: false },
    { text: "Reebok", checked: false },
    { text: "Balenciaga", checked: false },
    { text: "Lacoste", checked: false },
    { text: "Yeezy", checked: false },
    { text: "Off-White", checked: false },
    { text: "Converse", checked: false },
    { text: "Stone Island", checked: false },
    { text: "The North Face", checked: false },
    { text: "Ralph Lauren", checked: false },
    { text: "Guess", checked: false },
    { text: "Tommy Hilfiger", checked: false },
    { text: "VLONE", checked: false },
    { text: "Inne", checked: false },
  ],
  types: [
    { text: "MĘSKI", checked: false },
    { text: "DAMSKI", checked: false },
  ],
  conditions: [
    { text: "DS", checked: false },
    { text: "VNDS", checked: false },
    { text: "4/5", checked: false },
    { text: "3/5", checked: false },
    { text: "2/5", checked: false },
    { text: "1/5", checked: false },
  ],
  shoesSizes: [
    { text: "36.0", checked: false },
    { text: "36.5", checked: false },
    { text: "37.0", checked: false },
    { text: "37.5", checked: false },
    { text: "38.0", checked: false },
    { text: "38.5", checked: false },
    { text: "39.0", checked: false },
    { text: "39.5", checked: false },
    { text: "40.0", checked: false },
    { text: "40.5", checked: false },
    { text: "41.0", checked: false },
    { text: "41.5", checked: false },
    { text: "42.0", checked: false },
    { text: "42.5", checked: false },
    { text: "43.0", checked: false },
    { text: "43.5", checked: false },
    { text: "44.0", checked: false },
    { text: "44.5", checked: false },
    { text: "45.0", checked: false },
    { text: "45.5", checked: false },
    { text: "46.0", checked: false },
    { text: "46.5", checked: false },
    { text: "47.0", checked: false },
    { text: "47.5", checked: false },
    { text: "48.0", checked: false },
    { text: "48.5", checked: false },
    { text: "49.0", checked: false },
    { text: "49.5", checked: false },
    { text: "50.0", checked: false },
  ],
  clothesSizes: [
    { text: "XXS", checked: false },
    { text: "XS", checked: false },
    { text: "S", checked: false },
    { text: "M", checked: false },
    { text: "L", checked: false },
    { text: "XL", checked: false },
    { text: "XXL", checked: false },
  ],
  fits: [
    { text: "SLIM FIT", checked: false },
    { text: "REGULAR", checked: false },
    { text: "OVERSIZE", checked: false },
  ],
  colors: [
    { text: "#A23A3A", checked: false },
    { text: "#F2324D", checked: false },
    { text: "#F4A523", checked: false },
    { text: "#F8E71B", checked: false },
    { text: "#7CD321", checked: false },
    { text: "#4CA3FD", checked: false },
    { text: "#8F12FF", checked: false },
    { text: "#EC94FF", checked: false },
    { text: "#000000", checked: false },
    { text: "#AAAAAA", checked: false },
  ],
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_STATE":
      return {
        ...state,
        [action.payload.filterType]: [
          ...state[action.payload.filterType].map((filter) =>
            filter.id === action.payload.id
              ? { ...filter, checked: !filter.checked }
              : filter
          ),
        ],
      };
    default:
      return state;
  }
};

export default filtersReducer;
