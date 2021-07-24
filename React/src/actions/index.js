let nextId = 5;

export const removeItem = (itemType, id) => {
  return {
    type: "REMOVE_ITEM",
    payload: {
      itemType,
      id,
    },
  };
};

export const addItem = (itemType, itemContent) => {
  return {
    type: "ADD_ITEM",
    payload: {
      itemType,
      id: nextId++,
      itemContent,
    },
  };
};
