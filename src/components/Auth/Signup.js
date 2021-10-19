import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

import { signup } from "../../actions/auth";
import useStyles from "./styles";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
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
    <form className={classes.form} onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        type="text"
        className={classes.input}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />
      <input
        placeholder="Email"
        type="email"
        className={classes.input}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        className={classes.input}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <Button
        size="large"
        variant="contained"
        className={classes.btn}
        type="submit"
      >
        Sign Up
      </Button>
      <p>
        Have an account?{" "}
        <Link style={{ color: "#39A2DB", textDecoration: "none" }} to="/login">
          Login!
        </Link>
      </p>
    </form>
  );
};

export default Signup;
