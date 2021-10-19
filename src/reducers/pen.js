import { SET_PEN, SET_NAME } from "../constants/actionTypes";

const reducer = (state = { name: "", pen: null }, action) => {
  switch (action.type) {
    case SET_PEN:
      return { ...state, name: action.data?.name, pen: action.data };
    case SET_NAME:
      return { ...state, name: action.name };
    default:
      return state;
  }
};

export default reducer;
