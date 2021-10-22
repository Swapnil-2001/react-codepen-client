import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";

import { signup } from "../../actions/auth";
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

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) return;
    dispatch(
      signup(
        {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
        history
      )
    );
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
      <h1 className={classes.heading__div}>Sign Up</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          type="text"
          className={classes.input}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
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
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <input
          placeholder="Confirm Password"
          type="password"
          className={classes.input}
          onChange={(e) =>
            setUserData({ ...userData, confirmPassword: e.target.value })
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
          Sign Up
        </Button>
        <p>
          Have an account?{" "}
          <Link
            style={{ color: "#39A2DB", textDecoration: "none" }}
            to="/login"
          >
            Login!
          </Link>
        </p>
      </form>
    </>
  );
};

export default Signup;
