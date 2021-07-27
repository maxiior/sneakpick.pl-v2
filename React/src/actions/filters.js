export const changeState = (filterType, id) => {
  return {
    type: "CHANGE_STATE",
    payload: {
      filterType,
      id,
    },
  };
};

export const resetAllStates = () => {
  return {
    type: "RESET_ALL_STATES",
  };
};
