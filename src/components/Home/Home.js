import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

import useStyles from "./styles";
import { getAllPens } from "../../actions/pen";
import { SET_NAME, LOGOUT } from "../../constants/actionTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { allPens } = useSelector((state) => state.pen);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  useEffect(() => {
    dispatch(getAllPens());
  }, [dispatch]);

  const handleNameAdd = (e) => {
    const { value } = e.target;
    setName(value.length > 10 ? value.substring(0, 10) : value);
  };

  const handleClick = () => {
    dispatch({ type: SET_NAME, name });
    history.push("/pen/new");
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/login");
  };

  return (
    <div style={{ padding: "25px 50px" }}>
      <Button style={{ textTransform: "none" }} onClick={() => setOpen(true)}>
        New pen
      </Button>
      <Button onClick={logout}>Log Out</Button>
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
        <Box className={classes.box} sx={style}>
          <TextField
            value={name}
            style={{ width: "100%" }}
            onChange={handleNameAdd}
            label="Name (<=10 Characters)"
            variant="outlined"
          />
          <Button
            style={{ marginTop: "15px", width: "fit-content" }}
            variant="contained"
            onClick={handleClick}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
