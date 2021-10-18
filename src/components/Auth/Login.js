import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { signin } from "../../actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(userData, history));
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
