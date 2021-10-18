import { AUTH, LOGOUT } from "../constants/actionTypes";

const reducer = (state = { user: null, isLoading: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.data));
      return { ...state, user: action.data, isLoading: false };
    case LOGOUT:
      localStorage.clear();
      return { ...state, user: null, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
