export const changeState = (filterType, id) => {
  return {
    type: "CHANGE_STATE",
    payload: {
      filterType,
      id,
    },
  };
};
