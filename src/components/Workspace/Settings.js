import React from "react";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

import "./settings.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "350px",
  backgroundColor: "#334756",
  borderRadius: "10px",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const CustomSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#5C7AEA",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#5C7AEA",
  },
}));

const Settings = ({ openModal, setOpenModal, preferences, setPreferences }) => {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-wrapper" style={style}>
          <div className="option">
            <p>Font Size</p>
            <div className="dropdown">
              <p>{preferences.fontSize}px</p>
              <div className="dropdown-content">
                <p
                  onClick={() =>
                    setPreferences((prevState) => ({
                      ...prevState,
                      fontSize: "12",
                    }))
                  }
                >
                  12px
                </p>
                <p
                  onClick={() =>
                    setPreferences((prevState) => ({
                      ...prevState,
                      fontSize: "14",
                    }))
                  }
                >
                  14px
                </p>
                <p
                  onClick={() =>
                    setPreferences((prevState) => ({
                      ...prevState,
                      fontSize: "16",
                    }))
                  }
                >
                  16px
                </p>
                <p
                  onClick={() =>
                    setPreferences((prevState) => ({
                      ...prevState,
                      fontSize: "18",
                    }))
                  }
                >
                  18px
                </p>
              </div>
            </div>
          </div>
          <div className="option">
            <p>Theme</p>
            <div className="dropdown">
              <p>{preferences.theme}</p>
              <div className="dropdown-content">
                <p
                  onClick={() =>
                    setPreferences((prevState) => ({
                      ...prevState,
                      theme: "night",
                    }))
                  }
                >
                  night
                </p>
                <p
                  onClick={() =>
                    setPreferences((prevState) => ({
                      ...prevState,
                      theme: "material",
                    }))
                  }
                >
                  material
                </p>
                <p
                  onClick={() =>
                    setPreferences((prevState) => ({
                      ...prevState,
                      theme: "monokai",
                    }))
                  }
                >
                  monokai
                </p>
                <p
                  onClick={() =>
                    setPreferences((prevState) => ({
                      ...prevState,
                      theme: "default",
                    }))
                  }
                >
                  default (light)
                </p>
              </div>
            </div>
          </div>
          <div className="option">
            <p>Line Numbering</p>
            <div className="lineNumbers-div">
              <CustomSwitch
                checked={preferences.lineNumbers}
                onChange={(e) =>
                  setPreferences((prevState) => ({
                    ...prevState,
                    lineNumbers: e.target.checked,
                  }))
                }
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
