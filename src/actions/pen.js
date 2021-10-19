import { SET_PEN } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const createPen = (penData) => async (dispatch) => {
  try {
    const { data } = await api.createPen(penData);
    dispatch({ type: SET_PEN, data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePen = (id, penData) => async (dispatch) => {
  try {
    const { data } = await api.updatePen(id, penData);
    dispatch({ type: SET_PEN, data });
  } catch (error) {
    console.log(error);
  }
};
