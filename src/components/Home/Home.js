import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

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
  const { allPens } = useSelector((state) => state.pen);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllPens());
  }, [dispatch]);

  const handleClick = () => {
    dispatch({ type: SET_NAME, name });
    history.push("/pen");
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/login");
  };

  return (
    <div>
      <Button style={{ textTransform: "none" }} onClick={() => setOpen(true)}>
        New pen
      </Button>
      <Button onClick={logout}>Log Out</Button>
      {allPens?.map((pen) => (
        <div
          key={pen._id}
          onClick={() => {
            history.push(`/pen/${pen._id}`);
          }}
        >
          {pen.name}
        </div>
      ))}
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
            onChange={(e) => setName(e.target.value)}
            label="Name"
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