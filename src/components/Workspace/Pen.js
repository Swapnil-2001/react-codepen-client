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
import FavoriteIcon from "@mui/icons-material/Favorite";
import { store } from "react-notifications-component";

import Editor from "./Editor";
import Settings from "./Settings";
import { getUser } from "../../actions/auth";
import { getPenById, createPen, updatePen, likePen } from "../../actions/pen";
import "./styles.css";
import "react-notifications-component/dist/theme.css";

const Pen = ({
  match: {
    params: { id },
  },
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  // have name separately because "pen" is not set until a new project is saved
  const { isLoading, name, pen, error, saved } = useSelector(
    (state) => state.pen
  );

  const [html, setHtml] = useState("Hey There!");
  const [css, setCss] = useState("body {\n  background: white;\n}");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  const [editName, setEditName] = useState(false);
  // checks if name is being edited or not; accordingly have "name" as input / div
  const [newName, setNewName] = useState(name);
  // sets the name after editName === true

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // primarily handles user trying to save after session has expired
    if (error) alert(error.message);
    // in case of page refresh; localStorage remains unaffected
    if (user && !currentUser) dispatch(getUser(user.result?.username));
  }, [user, dispatch, currentUser, error, history]);

  useEffect(() => {
    if (saved) {
      store.addNotification({
        title: "Keep going!",
        message: "Changes saved.",
        type: "default",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1500,
          onScreen: true,
          pauseOnHover: true,
        },
      });
    }
  }, [saved]);

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
    if (name) setNewName(name);
    // if page refreshed before a new pen has been saved to DB
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
    }, 600);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  // change name of pen
  const handleChange = (e) => {
    const { value } = e.target;
    setNewName(value.length > 10 ? value.substring(0, 10) : value);
  };

  const handlePenSave = () => {
    if (!user) {
      history.push("/login");
      return;
    }
    if (id === "new") {
      // saving for the first time
      dispatch(
        createPen(
          { name, creatorUsername: user?.result?.username, html, css, js },
          history
        )
      );
    } else {
      if (user?.result?._id === pen.creator) {
        dispatch(
          updatePen(pen._id, {
            name: newName,
            html,
            css,
            js,
            likes: pen.likes,
            creator: pen.creator,
            creatorUsername: pen.creatorUsername,
          })
        );
      } else dispatch(createPen({ name, html, css, js }, history));
      // essentially cloning a project
    }
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
            onClick={() => dispatch(likePen(pen?._id))}
            className="item like-div"
          >
            {pen?.likes.includes(user?.result?._id) ? (
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
