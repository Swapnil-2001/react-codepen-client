import React from "react";
import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";

import "./styles.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  backgroundColor: "#334756",
  borderRadius: "10px",
  height: "50vh",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const Settings = ({ openModal, setOpenModal }) => {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <div className="option">
            <p>Font Size</p>
            <div class="dropdown">
              <p>Mouse over me</p>
              <div class="dropdown-content">
                <p>Hello World!</p>
                <p>Hello World!</p>
              </div>
            </div>
          </div>
          <div className="option">
            <p>Theme</p>
            <div class="dropdown">
              <p>Mouse over me</p>
              <div class="dropdown-content">
                <p>Hello World!</p>
                <p>Hello World!</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
