import { AUTH, LOGOUT, SET_USER } from "../constants/actionTypes";

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
    default:
      return state;
  }
};

export default reducer;
