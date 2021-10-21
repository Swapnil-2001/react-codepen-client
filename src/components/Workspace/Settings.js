import React from "react";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
// import Button from "@mui/material/Button";

import { SET_FONT_SIZE, SET_THEME } from "../../constants/actionTypes";

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
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
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
            <div className="dropdown">
              <p>{currentUser?.fontSize}px</p>
              <div className="dropdown-content">
                <p onClick={() => dispatch({ type: SET_FONT_SIZE, data: 12 })}>
                  12px
                </p>
                <p onClick={() => dispatch({ type: SET_FONT_SIZE, data: 14 })}>
                  14px
                </p>
                <p onClick={() => dispatch({ type: SET_FONT_SIZE, data: 16 })}>
                  16px
                </p>
                <p onClick={() => dispatch({ type: SET_FONT_SIZE, data: 18 })}>
                  18px
                </p>
              </div>
            </div>
          </div>
          <div className="option">
            <p>Theme</p>
            <div class="dropdown">
              <p>{currentUser?.theme}</p>
              <div class="dropdown-content">
                <p onClick={() => dispatch({ type: SET_THEME, data: "night" })}>
                  night
                </p>
                <p
                  onClick={() =>
                    dispatch({ type: SET_THEME, data: "material" })
                  }
                >
                  material
                </p>
                <p
                  onClick={() => dispatch({ type: SET_THEME, data: "monokai" })}
                >
                  monokai
                </p>
                <p
                  onClick={() => dispatch({ type: SET_THEME, data: "default" })}
                >
                  default (light)
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
