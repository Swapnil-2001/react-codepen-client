import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import { store } from "react-notifications-component";

import Navbar from "./Navbar";
import Editor from "./Editor";
import Settings from "./Settings";
import { getPenById, createPen, updatePen } from "../../actions/pen";
import "./pen.css";
import "react-notifications-component/dist/theme.css";

const Pen = ({
  match: {
    params: { id },
  },
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const dispatch = useDispatch();

  // have name separately because "pen" is not set until a new project is saved
  const { isLoading, name, pen, error, saved } = useSelector(
    (state) => state.pen
  );

  const [html, setHtml] = useState("Hey There!");
  const [css, setCss] = useState("body {\n  background: white;\n}");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  const [preferences, setPreferences] = useState({
    fontSize: "14",
    theme: "material",
    lineNumbers: true,
  });

  const [newName, setNewName] = useState(name);
  // sets the name after editName === true

  const [openModal, setOpenModal] = useState(false);

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
    if (error)
      store.addNotification({
        title: "Uh oh!",
        message: error.message,
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2500,
          onScreen: true,
          pauseOnHover: true,
        },
      });
  }, [error]);

  useEffect(() => {
    if (id !== "new") dispatch(getPenById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (pen && id !== "new") {
      setHtml(pen.html);
      setCss(pen.css);
      setJs(pen.js);
    }
  }, [pen, id]);

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

  const handlePenSave = () => {
    if (!user) {
      history.push("/login");
      return;
    }
    if (id === "new")
      // saving for the first time
      dispatch(
        createPen(
          { name, creatorUsername: user?.result?.username, html, css, js },
          history
        )
      );
    else {
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

  if (isLoading)
    return (
      <div className="loading-div">
        <CircularProgress style={{ color: "white" }} />
      </div>
    );

  return (
    <>
      <Navbar
        newName={newName}
        setNewName={setNewName}
        id={id}
        handlePenSave={handlePenSave}
        setOpenModal={setOpenModal}
      />
      <div className="pane top-pane">
        <Editor
          preferences={preferences}
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          preferences={preferences}
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          preferences={preferences}
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <Settings
        preferences={preferences}
        setPreferences={setPreferences}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
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
