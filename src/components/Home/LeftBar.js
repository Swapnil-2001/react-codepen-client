import React from "react";
import { useDispatch } from "react-redux";

import { getStarredPens, getAllPens, getPensByUser } from "../../actions/pen";
import useStyles from "./styles";

const LeftBar = ({ user, setHeading, setError, setOpen }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <div style={{ paddingTop: "20px" }}>
      <h2 className={classes.heading}>Create</h2>
      <div
        onClick={() => {
          setError("");
          setOpen(true);
        }}
        className={classes.item}
      >
        <h4>New Pen</h4>
      </div>
      <h2 className={classes.heading}>Your Work</h2>
      <div
        onClick={() => {
          setHeading("Your Pens");
          dispatch(getPensByUser(user?.result?._id));
        }}
        className={classes.item}
      >
        <h4>Your Pens</h4>
      </div>
      <div
        onClick={() => {
          setHeading("Starred Pens");
          dispatch(getStarredPens(user?.result?._id));
        }}
        className={classes.item}
      >
        <h4>Starred Pens</h4>
      </div>
      <h2 className={classes.heading}>All</h2>
      <div
        onClick={() => {
          setHeading("All Pens");
          dispatch(getAllPens());
        }}
        className={classes.item}
      >
        <h4>All Pens</h4>
      </div>
    </div>
  );
};

export default LeftBar;
