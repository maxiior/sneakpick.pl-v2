export const changeState = (filterType, id, input) => {
  return {
    type: "WTS_CHANGE_STATE",
    payload: {
      filterType,
      id,
      input,
    },
  };
};
