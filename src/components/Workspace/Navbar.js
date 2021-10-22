import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Avatar from "@mui/material/Avatar";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { likePen } from "../../actions/pen";
import "./styles.css";
import "react-notifications-component/dist/theme.css";

const Navbar = ({ newName, setNewName, id, handlePenSave, setOpenModal }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const dispatch = useDispatch();

  const { name, pen } = useSelector((state) => state.pen);

  const [editName, setEditName] = useState(false);
  // checks if name is being edited or not; accordingly have "name" as input / div

  useEffect(() => {
    if (name) setNewName(name);
    // if page refreshed before a new pen has been saved to DB
    else if (id === "new") history.push("/");
  }, [name, id, setNewName, history]);

  // change name of pen
  const handleChange = (e) => {
    const { value } = e.target;
    setNewName(value.length > 10 ? value.substring(0, 10) : value);
  };

  const handleNameSave = (e) => {
    if (e.key === "Enter") {
      if (newName === "") alert("Name cannot be empty.");
      else {
        handlePenSave();
        setEditName(false);
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-item">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontWeight: "700",
            margin: "auto 0",
            marginLeft: "15px",
            color: "white",
          }}
        >
          React-Codepen
        </Link>
        <div onClick={handlePenSave} className="save-div">
          <SaveIcon style={{ color: "white" }} />
        </div>
      </div>
      <div className="navbar-item project-name">
        {pen?.creator === user?.result?._id ? (
          editName ? (
            <>
              <input
                className="name-input"
                value={newName}
                onKeyPress={handleNameSave}
                onChange={handleChange}
              />
              <ClearIcon
                style={{
                  fontSize: 20,
                  margin: "auto 0",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setEditName(false);
                  setNewName(name);
                }}
              />
            </>
          ) : (
            <>
              {name}
              <EditIcon
                style={{
                  fontSize: 20,
                  margin: "auto 0",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setEditName(true)}
              />
            </>
          )
        ) : (
          <>{name}</>
        )}
      </div>
      <div className="navbar-item right-panel">
        <div
          onClick={() => {
            if (!user) {
              history.push("/login");
              return;
            }
            dispatch(likePen(pen?._id));
          }}
          className="item like-div"
        >
          {user && pen?.likes.includes(user.result?._id) ? (
            <FavoriteIcon style={{ marginRight: "7px" }} />
          ) : (
            <FavoriteBorderIcon style={{ marginRight: "7px" }} />
          )}
          {pen?.likes.length}
        </div>
        <div className="item">
          <SettingsIcon
            style={{ cursor: "pointer" }}
            onClick={() => setOpenModal(true)}
          />
        </div>
        <div className="item">
          <Avatar
            style={{ backgroundColor: "#5C7AEA" }}
            sx={{ width: 35, height: 35 }}
          >
            {user?.result?.username.charAt(0)}
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
