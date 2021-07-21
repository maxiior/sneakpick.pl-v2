const initialState = {
  items: [
    {
      id: 1,
      name: "NIKE AIR MAX 95",
      price: "500 PLN + SHIP",
      state: "DS",
    },
    {
      id: 2,
      name: "NIKE AIR MAX 95",
      price: "500 PLN + SHIP",
      state: "DS",
    },
    {
      id: 3,
      name: "NIKE AIR MAX 95",
      price: "500 PLN + SHIP",
      state: "DS",
    },
    {
      id: 4,
      name: "NIKE AIR MAX 95",
      price: "500 PLN + SHIP",
      state: "DS",
    },
    {
      id: 5,
      name: "NIKE AIR MAX 95",
      price: "500 PLN + SHIP",
      state: "DS",
    },
    {
      id: 6,
      name: "NIKE AIR MAX 95",
      price: "500 PLN + SHIP",
      state: "DS",
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter(
            (announ) => announ.id !== action.payload.id
          ),
        ],
      };
    case "ADD_ITEM":
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType],
          action.payload.itemContent,
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;
