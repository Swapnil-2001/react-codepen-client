import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";

import { signin } from "../../actions/auth";
import useStyles from "./styles";

const BootstrapButton = styled(Button)({
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid white",
  lineHeight: 1.5,
  backgroundColor: "#334756",
  "&:hover": {
    backgroundColor: "#345B63",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#345B63",
  },
});

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
    <>
      <BootstrapButton
        variant="contained"
        component={Link}
        to="/"
        style={{ textTransform: "none", marginLeft: "75px", marginTop: "30px" }}
        startIcon={<ArrowBackIcon />}
      >
        Home
      </BootstrapButton>
      <h1 className={classes.heading__div}>Login</h1>
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
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <Button
          size="large"
          variant="contained"
          style={{
            textTransform: "none",
            width: "fit-content",
            marginTop: "30px",
            marginBottom: "20px",
          }}
          type="submit"
        >
          Login
        </Button>
        <p>
          Don't have an account?{" "}
          <Link
            style={{ color: "#39A2DB", textDecoration: "none" }}
            to="/signup"
          >
            Sign up!
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
