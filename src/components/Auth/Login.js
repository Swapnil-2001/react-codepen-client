import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

import { signin } from "../../actions/auth";
import useStyles from "./styles";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(userData, history));
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
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
        Login
      </Button>
      <p>
        Don't have an account?{" "}
        <Link style={{ color: "#39A2DB", textDecoration: "none" }} to="/signup">
          Sign up!
        </Link>
      </p>
    </form>
  );
};

export default Login;
