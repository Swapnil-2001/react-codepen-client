import {
  START_LOADING_POST,
  STOP_LOADING_POST,
  SET_ALL_PENS,
  SET_PEN,
  SET_NAME,
  SET_ERROR,
  SET_SAVED,
} from "../constants/actionTypes";

const reducer = (
  state = {
    isLoading: false,
    name: "",
    pen: null,
    allPens: [],
    error: null,
    saved: false,
  },
  action
) => {
  switch (action.type) {
    case START_LOADING_POST:
      return { ...state, isLoading: true };
    case STOP_LOADING_POST:
      return { ...state, isLoading: false };
    case SET_ALL_PENS:
      return { ...state, allPens: action.data };
    case SET_PEN:
      return { ...state, name: action.data?.name, pen: action.data };
    case SET_NAME:
      return { ...state, name: action.name };
    case SET_ERROR:
      return { ...state, error: action.error };
    case SET_SAVED:
      return { ...state, saved: action.status };
    default:
      return state;
  }
};

export default reducer;
