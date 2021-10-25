import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getUser = (username) => API.get(`/user/${username}`);
export const signup = (formData) => API.post("/user/signup", formData);
export const signin = (formData) => API.post("/user/signin", formData);

export const getAllPens = () => API.get("/pen");
export const getPenById = (id) => API.get(`/pen/${id}`);
export const getStarredPens = (userId) => API.get(`/pen/starred/${userId}`);
export const getPensByUser = (userId) => API.get(`/pen/all/${userId}`);
export const createPen = (penData) => API.post("/pen/create", penData);
export const updatePen = (id, penData) => API.patch(`/pen/save/${id}`, penData);
export const likePen = (id) => API.patch(`/pen/like/${id}`);
export const starPen = (id) => API.patch(`/pen/star/${id}`);
export const deletePen = (id) => API.delete(`/pen/${id}`);
