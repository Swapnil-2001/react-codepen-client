import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import LoginIcon from "@mui/icons-material/Login";
import CircularProgress from "@mui/material/CircularProgress";

import useStyles from "./styles";
import LeftBar from "./LeftBar";
import { getAllPens } from "../../actions/pen";
import { SET_NAME, LOGOUT } from "../../constants/actionTypes";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { isLoading, allPens } = useSelector((state) => state.pen);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllPens());
  }, [dispatch]);

  const handleNameAdd = (e) => {
    const { value } = e.target;
    setName(value.length > 10 ? value.substring(0, 10) : value);
  };

  const handleClick = () => {
    if (name === "") {
      setError("Name cannot be empty.");
      return;
    }
    dispatch({ type: SET_NAME, name });
    history.push("/pen/new");
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/login");
  };

  if (isLoading)
    return (
      <div className="loading-div">
        <CircularProgress style={{ color: "white" }} />
      </div>
    );

  return (
    <div style={{ display: "flex" }}>
      {user && (
        <div className={classes.left__div}>
          <LeftBar setError={setError} setOpen={setOpen} />
        </div>
      )}
      <div className={classes.right__div}>
        {user ? (
          <>
            <Button onClick={logout}>Log Out</Button>
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/login"
              endIcon={<LoginIcon />}
              style={{ textTransform: "none" }}
            >
              Login
            </Button>
          </div>
        )}
        <div className={classes.wrapper}>
          {allPens?.map((pen) => (
            <div
              key={pen._id}
              className={classes.thumbnail}
              onClick={() => {
                history.push(`/pen/${pen._id}`);
              }}
            >
              <div className={classes.frame}>
                <iframe
                  scrolling="no"
                  srcDoc={`<html>
                    <style>${pen.css}</style>
                    <body>${pen.html}</body>
                    <script>${pen.js}</script>
                  </html>`}
                  title="output"
                  sandbox="allow-scripts"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                />
              </div>
              <div className={classes.info__div}>
                <p>
                  {pen.name}, by {pen.creatorUsername}
                </p>
                {pen.creator === user?.result?._id && (
                  <span name="delete-span">
                    <DeleteIcon style={{ color: "#FF5C58" }} />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={classes.box}>
            <input
              value={name}
              className={classes.new__pen__input}
              onChange={handleNameAdd}
              placeholder="Name (<=10 Characters)"
            />
            {error && (
              <p
                style={{
                  background: "#A2D2FF",
                  padding: "5px 10px",
                  color: "#950101",
                  borderRadius: "5px",
                  marginBottom: "0",
                }}
              >
                {error}
              </p>
            )}
            <Button
              style={{
                margin: "20px 0 30px 0",
                width: "fit-content",
                textTransform: "none",
              }}
              variant="contained"
              color="info"
              onClick={handleClick}
            >
              Create
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
