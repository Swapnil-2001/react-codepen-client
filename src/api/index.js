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

export const signup = (formData) => API.post("/user/signup", formData);
export const signin = (formData) => API.post("/user/signin", formData);

export const createPen = (penData) => API.post("/pen/create", penData);
export const updatePen = (id, penData) => API.patch(`/pen/save/${id}`, penData);
