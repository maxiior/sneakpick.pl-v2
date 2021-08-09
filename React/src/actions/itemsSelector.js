export const changeState = (itemsSelectorType, data) => {
  return {
    type: "CHANGE_SELECTOR",
    payload: {
      itemsSelectorType,
      data,
    },
  };
};
