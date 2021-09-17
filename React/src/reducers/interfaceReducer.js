const initialState = {
  loginView: false,
  registerView: false,
  menuView: false,
  communicatorIcon: true,
};

const interfaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_LOGIN_VIEW":
      return {
        ...state,
        loginView: true,
        communicatorIcon: false,
      };
    case "CLOSE_LOGIN_VIEW":
      return {
        ...state,
        loginView: false,
        communicatorIcon: true,
      };
    case "OPEN_REGISTER_VIEW":
      return {
        ...state,
        registerView: true,
        communicatorIcon: false,
      };
    case "CLOSE_REGISTER_VIEW":
      return {
        ...state,
        registerView: false,
        communicatorIcon: true,
      };
    case "OPEN_MENU_VIEW":
      return {
        ...state,
        menuView: true,
        communicatorIcon: false,
      };
    case "CLOSE_MENU_VIEW":
      return {
        ...state,
        menuView: false,
        communicatorIcon: true,
      };
    case "DISPLAY_COMMUNICATOR_ICON":
      return {
        ...state,
        communicatorIcon: true,
      };
    case "HIDE_COMMUNICATOR_ICON":
      return {
        ...state,
        communicatorIcon: false,
      };
    default:
      return state;
  }
};

export default interfaceReducer;
