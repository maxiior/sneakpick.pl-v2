export const changeState = (filterType, id, input) => {
  return {
    type: "CHANGE_STATE",
    payload: {
      filterType,
      id,
      input,
    },
  };
};

export const resetAllStates = () => {
  return {
    type: "RESET_ALL_STATES",
  };
};
