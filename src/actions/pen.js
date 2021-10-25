import {
  START_LOADING_POST,
  STOP_LOADING_POST,
  SET_ALL_PENS,
  SET_PEN,
  SET_ERROR,
  SET_SAVED,
  LIKE_PEN,
  STAR_PEN,
  DELETE_PEN,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getAllPens = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST });
    const { data } = await api.getAllPens();
    dispatch({ type: SET_ALL_PENS, data });
    dispatch({ type: STOP_LOADING_POST });
  } catch (error) {
    console.log(error);
  }
};

export const getPensByUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST });
    const { data } = await api.getPensByUser(userId);
    dispatch({ type: SET_ALL_PENS, data });
    dispatch({ type: STOP_LOADING_POST });
  } catch (error) {
    console.log(error);
  }
};

export const getStarredPens = (userId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST });
    const { data } = await api.getStarredPens(userId);
    dispatch({ type: SET_ALL_PENS, data });
    dispatch({ type: STOP_LOADING_POST });
  } catch (error) {
    console.log(error);
  }
};

export const getPenById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_POST });
    const { data } = await api.getPenById(id);
    dispatch({ type: SET_PEN, data });
    dispatch({ type: STOP_LOADING_POST });
  } catch (error) {
    console.log(error);
  }
};

export const createPen = (penData, history) => async (dispatch) => {
  try {
    const { data } = await api.createPen(penData);
    if (data.message) {
      dispatch({ type: SET_ERROR, error: data });
      dispatch({ type: SET_ERROR, error: null });
    } else {
      dispatch({ type: SET_SAVED, status: true });
      dispatch({ type: SET_PEN, data });
      dispatch({ type: SET_SAVED, status: false });
    }
    history.push(`/pen/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePen = (id, penData) => async (dispatch) => {
  try {
    const { data } = await api.updatePen(id, penData);
    if (data.message) {
      dispatch({ type: SET_ERROR, error: data });
      dispatch({ type: SET_ERROR, error: null });
    } else {
      dispatch({ type: SET_SAVED, status: true });
      dispatch({ type: SET_PEN, data });
      dispatch({ type: SET_SAVED, status: false });
    }
  } catch (error) {
    console.log(error);
  }
};

export const likePen = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePen(id);
    if (data.message) {
      dispatch({ type: SET_ERROR, error: data });
      dispatch({ type: SET_ERROR, error: null });
    } else dispatch({ type: LIKE_PEN, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const starPen = (id) => async (dispatch) => {
  try {
    const { data } = await api.starPen(id);
    if (data.message) {
      dispatch({ type: SET_ERROR, error: data });
      dispatch({ type: SET_ERROR, error: null });
    } else dispatch({ type: STAR_PEN, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePen = (id) => async (dispatch) => {
  try {
    await api.deletePen(id);
    dispatch({ type: DELETE_PEN, id });
  } catch (error) {
    console.log(error);
  }
};
