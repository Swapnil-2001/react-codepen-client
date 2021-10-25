import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import LoginIcon from "@mui/icons-material/Login";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteIcon from "@mui/icons-material/Favorite";

import useStyles from "./styles";
import LeftBar from "./LeftBar";
import { getAllPens, getPensByUser, deletePen } from "../../actions/pen";
import { SET_NAME, LOGOUT } from "../../constants/actionTypes";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { isLoading, allPens } = useSelector((state) => state.pen);
  const [heading, setHeading] = useState(user ? "Your Pens" : "All Pens");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const classes = useStyles();

  useEffect(() => {
    // adding "user" in the dep. array causes infinite re-render.
    // probably because useEffect is triggered BEFORE "user" has
    // been fetched from localStorage. Then it IS fetched, which
    // triggers useEffect again, WHICH re-renders the page, and
    // the cycle goes on and on. So use "currentUser".
    const currentUser = JSON.parse(localStorage.getItem("profile"));
    if (currentUser) dispatch(getPensByUser(currentUser.result?._id));
    else dispatch(getAllPens());
  }, [dispatch]);

  const handleNameAdd = (e) => {
    const { value } = e.target;
    setName(value.length > 10 ? value.substring(0, 10) : value);
  };

  const handleClick = () => {
    if (name === "") {
      setError("Name cannot be empty!");
      return;
    }
    dispatch({ type: SET_NAME, name });
    history.push("/pen/new");
  };

  const handleNameSave = (e) => {
    if (e.key === "Enter") handleClick();
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
          <LeftBar
            user={user}
            setHeading={setHeading}
            setError={setError}
            setOpen={setOpen}
          />
        </div>
      )}
      <div className={classes.right__div}>
        {user ? (
          <div style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              style={{ textTransform: "none" }}
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
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
        <h1>{heading}</h1>
        <div className={classes.wrapper}>
          {allPens.length === 0 ? (
            <h2>No Pens!</h2>
          ) : (
            allPens?.map((pen) => (
              <div
                key={pen._id}
                className={classes.thumbnail}
                onClick={(e) => {
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
                    <span
                      className={classes.delete}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(pen._id);
                      }}
                      name="delete-span"
                    >
                      <DeleteIcon style={{ color: "#FF5C58" }} />
                    </span>
                  )}
                </div>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px 0",
                  }}
                >
                  {pen.likes?.length}{" "}
                  <FavoriteIcon style={{ marginLeft: "5px" }} />
                </span>
              </div>
            ))
          )}
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
              onKeyPress={handleNameSave}
              onChange={handleNameAdd}
              placeholder="Name..."
            />
            {error && (
              <h4
                style={{
                  background: "#5C7AEA",
                  padding: "5px 10px",
                  color: "#fff",
                  borderRadius: "5px",
                  marginBottom: "0",
                }}
              >
                {error}
              </h4>
            )}
            <Button
              style={{
                margin: "20px 0 30px 0",
                width: "fit-content",
                textTransform: "none",
              }}
              variant="contained"
              onClick={handleClick}
            >
              Create
            </Button>
          </div>
        </Modal>
        <Modal
          open={deleteId}
          onClose={() => setDeleteId("")}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={classes.box}>
            <div style={{ margin: "30px", marginTop: "50px" }}>
              Are you sure you want to delete this pen?
            </div>
            <div style={{ marginBottom: "30px" }}>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(deletePen(deleteId));
                  setDeleteId("");
                }}
                style={{ marginRight: "20px" }}
                color="error"
              >
                Yes
              </Button>
              <Button
                onClick={() => setDeleteId("")}
                variant="contained"
                color="info"
              >
                No
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
