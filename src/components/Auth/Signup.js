import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { signup } from "../../actions/auth";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(userData, history));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="username"
        type="text"
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />
      <input
        placeholder="email"
        type="email"
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
