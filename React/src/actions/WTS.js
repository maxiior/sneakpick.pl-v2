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

export const removeFromCitiesArray = (index) => {
  return {
    type: "REMOVE_FROM_CITIES_ARRAY",
    payload: {
      index,
    },
  };
};

export const updateCitiesArray = (index, id) => {
  return {
    type: "UPDATE_CITIES_ARRAY",
    payload: {
      index,
      id,
    },
  };
};

export const setCitiesArray = (id) => {
  return {
    type: "SET_CITIES_ARRAY",
    payload: {
      id,
    },
  };
};
