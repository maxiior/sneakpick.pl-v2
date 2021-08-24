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

export const addToCitiesArray = () => {
  return {
    type: "ADD_TO_CITIES_ARRAY",
  };
};

export const removeFromCitiesArray = (iteration) => {
  return {
    type: "REMOVE_FROM_CITIES_ARRAY",
    payload: {
      iteration,
    },
  };
};
