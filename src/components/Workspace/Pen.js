import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useHistory } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Avatar from "@mui/material/Avatar";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Editor from "./Editor";
import Settings from "./Settings";
import { getPenById, createPen, updatePen } from "../../actions/pen";
import "./styles.css";

const Pen = ({
  match: {
    params: { id },
  },
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, name, pen, error } = useSelector((state) => state.pen);
  const [html, setHtml] = useState("Hey There!");
  const [css, setCss] = useState("body {\n  background: white;\n}");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  const [editName, setEditName] = useState(false);
  const [editableName, setEditableName] = useState(name);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (error) alert(error.message);
  }, [user, error, history]);

  useEffect(() => {
    if (id !== "new") {
      dispatch(getPenById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (pen && id !== "new") {
      setHtml(pen.html);
      setCss(pen.css);
      setJs(pen.js);
    }
    if (name) setEditableName(name);
    else if (id === "new") history.push("/");
  }, [pen, name, id, history]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <style>${css}</style>
          <body>${html}</html>
          <script>${js}</script>
        </html>
      `);
    }, 500);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleChange = (e) => {
    const { value } = e.target;
    setEditableName(value.length > 10 ? value.substring(0, 10) : value);
  };

  const handleSave = () => {
    if (!user) {
      history.push("/login");
      return;
    }
    if (id === "new") {
      dispatch(createPen({ name, html, css, js }, history));
    } else {
      if (user?.result?._id === pen.creator) {
        dispatch(
          updatePen(pen._id, {
            name: editableName,
            html,
            css,
            js,
            likes: pen.likes,
            creator: pen.creator,
          })
        );
      } else {
        dispatch(createPen({ name, html, css, js }, history));
      }
    }
  };

  const handleNameChange = (e) => {
    if (e.key === "Enter") {
      if (editableName === "") alert("Name cannot be empty.");
      else {
        handleSave();
        setEditName(false);
      }
    }
  };

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "75px",
        }}
      >
        <CircularProgress style={{ color: "white" }} />
      </div>
    );

  return (
    <>
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
          <div onClick={handleSave} className="save-div">
            <SaveIcon style={{ color: "white" }} />
          </div>
        </div>
        <div className="navbar-item project-name">
          {pen?.creator === user?.result?._id ? (
            editName ? (
              <>
                <input
                  className="name-input"
                  value={editableName}
                  onKeyPress={handleNameChange}
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
                    setEditableName(name);
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
          <div className="item">
            <FavoriteBorderIcon />
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
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <Settings openModal={openModal} setOpenModal={setOpenModal} />
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
};
export default Pen;
