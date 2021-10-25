import { AUTH, SET_AUTH_ERROR } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    if (data.message) {
      dispatch({ type: SET_AUTH_ERROR, error: data });
      dispatch({ type: SET_AUTH_ERROR, error: null });
    } else {
      dispatch({ type: AUTH, data });
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    if (data.message) {
      dispatch({ type: SET_AUTH_ERROR, error: data });
      dispatch({ type: SET_AUTH_ERROR, error: null });
    } else {
      dispatch({ type: AUTH, data });
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};

// export const getUser = (username) => async (dispatch) => {
//   try {
//     const { data } = await api.getUser(username);
//     dispatch({ type: SET_USER, data });
//   } catch (error) {
//     console.log(error);
//   }
// };
