import React from "react";

import useStyles from "./styles";

const LeftBar = ({ setError, setOpen }) => {
  const classes = useStyles();
  return (
    <div style={{ paddingTop: "20px", position: "sticky" }}>
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
      <div className={classes.item}>
        <h4>Your Pens</h4>
      </div>
    </div>
  );
};

export default LeftBar;
