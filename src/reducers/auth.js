import {
  AUTH,
  LOGOUT,
  SET_USER,
  SET_FONT_SIZE,
  SET_THEME,
  SET_LINE_NUMBERS,
} from "../constants/actionTypes";

const reducer = (state = { currentUser: null, isLoading: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.data));
      return { ...state, currentUser: action.data?.result, isLoading: false };
    case LOGOUT:
      localStorage.clear();
      return { ...state, currentUser: null, isLoading: false };
    case SET_USER:
      return { ...state, currentUser: action.data };
    case SET_FONT_SIZE:
      return {
        ...state,
        currentUser: { ...state.currentUser, fontSize: action.data },
      };
    case SET_THEME:
      return {
        ...state,
        currentUser: { ...state.currentUser, theme: action.data },
      };
    case SET_LINE_NUMBERS:
      return {
        ...state,
        currentUser: { ...state.currentUser, lineNumbers: action.data },
      };
    default:
      return state;
  }
};

export default reducer;
