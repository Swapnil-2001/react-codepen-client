import { AUTH, LOGOUT } from "../constants/actionTypes";

const reducer = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.data));
      return { ...state, isLoading: false };
    case LOGOUT:
      localStorage.clear();
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
