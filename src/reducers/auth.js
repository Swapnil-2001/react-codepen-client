import { AUTH, LOGOUT, SET_AUTH_ERROR } from "../constants/actionTypes";

const reducer = (state = { error: null, isLoading: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.data));
      return { ...state, isLoading: false };
    case LOGOUT:
      localStorage.clear();
      return { ...state, isLoading: false };
    case SET_AUTH_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default reducer;
