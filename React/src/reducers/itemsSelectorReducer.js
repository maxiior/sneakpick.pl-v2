const initialState = {
  sortingModes: [
    "Domyślne",
    "Cena Rosnąco",
    "Cena Malejąco",
    "Popularne",
    "Najnowsze",
  ],
  paginationModes: [24, 48],
  currentSorting: 0,
  currentPagination: 24,
  currentPage: 1,
};

const itemsSelectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_SELECTOR":
      return {
        ...state,
        [action.payload.itemsSelectorType]: action.payload.data,
      };
    default:
      return state;
  }
};

export default itemsSelectorReducer;
